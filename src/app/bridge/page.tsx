"use client"

import { valibotResolver } from "mantine-form-valibot-resolver"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Input, maxValue, minValue, number, object } from "valibot"
import { parseUnits } from "viem"

import { BridgeApproveModal } from "@/components/bridge/approve-modal"
import BridgeConfirmButton from "@/components/bridge/confirm-button"
import { BridgeDepositModal } from "@/components/bridge/deposit-modal"
import { useEstimateDepositGas } from "@/hooks/useEstimateDepositGas"
import { useRSS3Allowance } from "@/hooks/useRSS3Allowance"
import { useRSS3Balance } from "@/hooks/useRSS3Balance"
import { api } from "@/lib/trpc/client"
import { mainnetChain, rss3Chain } from "@/lib/wagmi/config/chains"
import { rss3Tokens } from "@/lib/wagmi/config/tokens"
import { Button, Card, NumberInput, SegmentedControl } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { IconEthereum, IconRss3Circle } from "@rss3/web3-icons-react"

export default function BridgePage() {
  const [actionType, setActionType] = useState("Deposit")

  const [from, to] =
    actionType === "Deposit"
      ? [mainnetChain, rss3Chain]
      : [rss3Chain, mainnetChain]
  const [FromIcon, ToIcon] =
    actionType === "Deposit"
      ? [IconEthereum, IconRss3Circle]
      : [IconRss3Circle, IconEthereum]

  const fromBalance = useRSS3Balance(from.id)
  const toBalance = useRSS3Balance(to.id)
  const gasSymbol = from.nativeCurrency.symbol

  const maxBalance = parseFloat(fromBalance.formatted)
  const formSchema = useMemo(
    () =>
      object({
        amount: number([
          minValue(0),
          maxValue(maxBalance, `Insufficient balance (max: ${maxBalance})`),
        ]),
      }),
    [maxBalance],
  )

  const form = useForm<Input<typeof formSchema>>({
    initialValues: {
      amount: 0,
    },
    validate: valibotResolver(formSchema),
  })

  const [
    depositModalOpened,
    { open: depositModalOpen, close: depositModalClose },
  ] = useDisclosure(false)

  useEffect(() => {
    form.reset()
  }, [actionType])

  const estimatedDepositGas = useEstimateDepositGas()
  const tokenPrice = api.thirdParty.tokenPrice.useQuery()
  const gasWorth = (
    parseFloat(estimatedDepositGas.data) * (tokenPrice.data?.[gasSymbol] || 0)
  ).toFixed(3)

  const requestedAmount = parseUnits(
    form.values.amount.toString(),
    rss3Tokens.decimals,
  )
  const rss3Allowance = useRSS3Allowance()

  const [
    approveModalOpened,
    { open: approveModalOpen, close: approveModalClose },
  ] = useDisclosure(false)

  const isExceededAllowance = requestedAmount > (rss3Allowance.data || 0)

  const onConfirm = useCallback(() => {
    const result = form.validate()
    if (!result.hasErrors) {
      if (isExceededAllowance) {
        approveModalOpen()
      } else {
        depositModalOpen()
      }
    }
  }, [form, depositModalOpen, isExceededAllowance, approveModalOpen])

  return (
    <div className="flex items-center justify-center pt-32">
      <Card className="w-[600px]" shadow="xs" radius="lg" withBorder>
        <SegmentedControl
          value={actionType}
          onChange={setActionType}
          fullWidth
          size="xl"
          radius="lg"
          data={["Deposit", "Withdraw"]}
          className="mb-8"
        />
        <Card radius="lg" className="bg-zinc-100 space-y-4">
          <div className="flex items-center gap-2">
            <span>From</span>
            <FromIcon className="w-5 h-5" />
            <span className="font-semibold">{from.name}</span>
          </div>
          <form>
            <NumberInput
              size="xl"
              radius="lg"
              rightSection={
                <div className="flex items-center gap-2 text-zinc-700">
                  <IconRss3Circle className="w-10 h-10" />
                  RSS3
                </div>
              }
              rightSectionWidth={150}
              placeholder="0.0"
              styles={{
                error: {
                  fontSize: "0.9rem",
                  marginTop: "0.75rem",
                },
              }}
              {...form.getInputProps("amount")}
            />
          </form>
          <div className="flex items-center gap-1">
            <span>
              Balance: {fromBalance.isPending ? "-" : fromBalance.formatted}{" "}
              RSS3
            </span>
            <Button
              variant="subtle"
              className="text-primary-500 px-1 h-7"
              onClick={() => {
                form.setFieldValue("amount", maxBalance)
              }}
            >
              (Max)
            </Button>
          </div>
        </Card>
        <div className="w-full flex justify-center my-4 text-primary-500 text-2xl">
          <i className="i-mingcute-arrow-down-fill" />
        </div>
        <Card radius="lg" className="bg-zinc-100 space-y-4">
          <div className="flex items-center gap-2">
            <span>To</span>
            <ToIcon className="w-5 h-5" />
            <span className="font-semibold">{to.name}</span>
          </div>
          <div>You will receive: {form.values.amount || 0} RSS3</div>
          <div>
            Balance: {toBalance.isPending ? "-" : toBalance.formatted} RSS3
          </div>
        </Card>
        <BridgeConfirmButton
          action={actionType as "Deposit" | "Withdraw"}
          hasValue={!!form.values.amount}
          onConfirm={onConfirm}
        />
        <div className="mt-8 text-sm">
          <div className="flex justify-between">
            <div>Gas fee to transfer</div>
            <div className="font-semibold">
              {estimatedDepositGas.isPending ? "-" : estimatedDepositGas.data}{" "}
              {gasSymbol} ($
              {estimatedDepositGas.isPending || tokenPrice.isPending
                ? "-"
                : gasWorth}
              )
            </div>
          </div>
          <div className="flex justify-between">
            <div>Time to transfer</div>
            <div className="font-semibold">~10 minute</div>
          </div>
        </div>
        {actionType === "Deposit" ? (
          <>
            <BridgeApproveModal
              opened={approveModalOpened}
              close={approveModalClose}
              amount={form.values.amount}
              onSuccess={() => depositModalOpen()}
            />
            <BridgeDepositModal
              opened={depositModalOpened}
              close={depositModalClose}
              amount={form.values.amount}
              onSuccess={() => {
                form.reset()
                fromBalance.refetch?.()
                toBalance.refetch?.()
              }}
            />
          </>
        ) : null}
      </Card>
    </div>
  )
}
