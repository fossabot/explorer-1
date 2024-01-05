"use client"

import { valibotResolver } from "mantine-form-valibot-resolver"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Input, maxValue, minValue, number, object } from "valibot"
import { parseUnits } from "viem"

import BridgeButton from "@/components/bridge-button"
import { useEstimateDepositGas } from "@/hooks/useEstimateDepositGas"
import { useRSS3Allowance } from "@/hooks/useRSS3Allowance"
import { useRSS3Balance } from "@/hooks/useRSS3Balance"
import { useRSS3Deposit } from "@/hooks/useRSS3Deposit"
import { api } from "@/lib/trpc/client"
import { mainnetChain, rss3Chain } from "@/lib/wagmi/config/chains"
import { rss3Tokens } from "@/lib/wagmi/config/tokens"
import {
  Button,
  Card,
  Modal,
  NumberInput,
  SegmentedControl,
} from "@mantine/core"
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

  const estimatedDepositGas = useEstimateDepositGas()

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
    reviewModalOpened,
    { open: reviewModalOpen, close: reviewModalClose },
  ] = useDisclosure(false)

  useEffect(() => {
    form.reset()
  }, [actionType])

  const tokenPrice = api.thirdParty.tokenPrice.useQuery()

  const requestedAmount = parseUnits(
    form.values.amount.toString(),
    rss3Tokens.decimals,
  )
  const rss3Allowance = useRSS3Allowance()

  const deposit = useRSS3Deposit()

  const isExceededAllowance = requestedAmount > (rss3Allowance.data || 0)

  const handleDeposit = (values: Input<typeof formSchema>) => {
    if (isExceededAllowance) {
      console.log("isExceededAllowance")
    } else {
      deposit.write(parseUnits(values.amount.toString(), rss3Tokens.decimals))
    }
  }

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
          <form onSubmit={form.onSubmit(handleDeposit)}>
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
            <span>Balance: {fromBalance.formatted} RSS3</span>
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
          <div>You will receive: {form.values.amount} RSS3</div>
          <div>Balance: {toBalance.formatted} RSS3</div>
        </Card>
        <BridgeButton
          action={actionType as "Deposit" | "Withdraw"}
          hasValue={!!form.values.amount}
          onConfirm={() => {
            const result = form.validate()
            if (!result.hasErrors) {
              reviewModalOpen()
            }
          }}
        />
        <div className="mt-8 text-sm">
          <div className="flex justify-between">
            <div>Gas fee to transfer</div>
            <div className="font-semibold">
              {estimatedDepositGas.data} {gasSymbol} ($
              {(
                parseFloat(estimatedDepositGas.data) *
                (tokenPrice.data?.ethereum || 0)
              ).toFixed(2)}
              )
            </div>
          </div>
          <div className="flex justify-between">
            <div>Time to transfer</div>
            <div className="font-semibold">~1 minute</div>
          </div>
        </div>
        {actionType === "Deposit" ? (
          <Modal
            opened={reviewModalOpened}
            onClose={reviewModalClose}
            title={<div className="font-bold text-xl">Review {actionType}</div>}
            centered
            size="md"
            radius="lg"
            padding="xl"
          >
            <form className="space-y-6" onSubmit={form.onSubmit(handleDeposit)}>
              <div>
                <div className="flex items-center text-lg">
                  <div className="flex items-center gap-2">
                    <FromIcon className="w-6 h-6" />
                    <span className="font-semibold">{from.name}</span>
                  </div>
                  <i className="i-mingcute-arrow-right-fill text-primary-500 mx-6" />
                  <div className="flex items-center gap-2">
                    <ToIcon className="w-6 h-6" />
                    <span className="font-semibold">{to.name}</span>
                  </div>
                </div>
              </div>
              <div>
                <p>Amount to deposit</p>
                <p className="font-semibold">
                  {form.values.amount} RSS3 ($
                  {(form.values.amount * (tokenPrice.data?.rss3 || 0)).toFixed(
                    2,
                  )}
                  )
                </p>
              </div>
              <div>
                <p>Gas fee to transfer</p>
                <p className="font-semibold">
                  {estimatedDepositGas.data} {gasSymbol} ($
                  {(
                    parseFloat(estimatedDepositGas.data) *
                    (tokenPrice.data?.ethereum || 0)
                  ).toFixed(2)}
                  )
                </p>
              </div>
              <div>
                <p>Time to transfer</p>
                <p className="font-semibold">~1 minute</p>
              </div>
              <Button fullWidth size="lg" radius="lg" type="submit">
                {actionType}
              </Button>
            </form>
          </Modal>
        ) : null}
      </Card>
    </div>
  )
}
