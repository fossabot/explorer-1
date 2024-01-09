import {
  createUseReadContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
  createUseWriteContract,
} from "wagmi/codegen"

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// rss3Token
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98d64da73a6616c42117b582e832812e7b8d57f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x568F64582A377ea52d0067c4E430B9aE22A60473)
 */
export const rss3TokenAbi = [
  {
    type: "event",
    inputs: [
      { name: "owner", type: "address", indexed: true },
      { name: "spender", type: "address", indexed: true },
      { name: "value", type: "uint256", indexed: false },
    ],
    name: "Approval",
  },
  {
    type: "event",
    inputs: [
      { name: "from", type: "address", indexed: true },
      { name: "to", type: "address", indexed: true },
      { name: "value", type: "uint256", indexed: false },
    ],
    name: "Transfer",
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ type: "uint8" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", type: "address" },
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ type: "bool" }],
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98d64da73a6616c42117b582e832812e7b8d57f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x568F64582A377ea52d0067c4E430B9aE22A60473)
 */
export const rss3TokenAddress = {
  1: "0xc98D64DA73a6616c42117b582e832812e7B8D57F",
  2333: "0x4200000000000000000000000000000000000042",
  11155111: "0x568F64582A377ea52d0067c4E430B9aE22A60473",
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98d64da73a6616c42117b582e832812e7b8d57f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x568F64582A377ea52d0067c4E430B9aE22A60473)
 */
export const rss3TokenConfig = {
  address: rss3TokenAddress,
  abi: rss3TokenAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// staking
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const stakingAbi = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [
      { name: "token", internalType: "address", type: "address" },
      { name: "treasury", internalType: "address", type: "address" },
      { name: "stakeRatio", internalType: "uint256", type: "uint256" },
      {
        name: "stakeUnbondingPeriod",
        internalType: "uint256",
        type: "uint256",
      },
      {
        name: "depositUnbondingPeriod",
        internalType: "uint256",
        type: "uint256",
      },
      { name: "nodeSlashFraction", internalType: "uint256", type: "uint256" },
      { name: "userSlashFraction", internalType: "uint256", type: "uint256" },
      { name: "minDeposit", internalType: "uint256", type: "uint256" },
    ],
  },
  { type: "error", inputs: [], name: "AccessControlBadConfirmation" },
  {
    type: "error",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "neededRole", internalType: "bytes32", type: "bytes32" },
    ],
    name: "AccessControlUnauthorizedAccount",
  },
  {
    type: "error",
    inputs: [{ name: "target", internalType: "address", type: "address" }],
    name: "AddressEmptyCode",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "AddressInsufficientBalance",
  },
  { type: "error", inputs: [], name: "AlreadyClaimed" },
  {
    type: "error",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "AmountTooSmall",
  },
  { type: "error", inputs: [], name: "BatchSizeZero" },
  { type: "error", inputs: [], name: "CallerNotNodeOwner" },
  { type: "error", inputs: [], name: "CallerNotStaking" },
  { type: "error", inputs: [], name: "CheckpointUnorderedInsertion" },
  {
    type: "error",
    inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
    name: "ChipNotAuthorized",
  },
  {
    type: "error",
    inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
    name: "ChipNotPublicGood",
  },
  {
    type: "error",
    inputs: [
      { name: "tokenId", internalType: "uint256", type: "uint256" },
      { name: "nodeAddr", internalType: "address", type: "address" },
    ],
    name: "ChipNotValid",
  },
  { type: "error", inputs: [], name: "ChipsIdOverflow" },
  {
    type: "error",
    inputs: [{ name: "claimId", internalType: "uint256", type: "uint256" }],
    name: "ClaimIdNotExists",
  },
  { type: "error", inputs: [], name: "ClaimTimeNotReady" },
  { type: "error", inputs: [], name: "DepositedTokensSlashedAll" },
  { type: "error", inputs: [], name: "EmptyNodeList" },
  { type: "error", inputs: [], name: "EnforcedPause" },
  { type: "error", inputs: [], name: "ExpectedPause" },
  { type: "error", inputs: [], name: "FailedInnerCall" },
  { type: "error", inputs: [], name: "InvalidArrayLength" },
  {
    type: "error",
    inputs: [
      { name: "expected", internalType: "uint256", type: "uint256" },
      { name: "actual", internalType: "uint256", type: "uint256" },
    ],
    name: "InvalidEpoch",
  },
  { type: "error", inputs: [], name: "InvalidInitialization" },
  { type: "error", inputs: [], name: "NodeExists" },
  { type: "error", inputs: [], name: "NodeNotExists" },
  {
    type: "error",
    inputs: [{ name: "nodeAddr", internalType: "address", type: "address" }],
    name: "NodeNotPublicGood",
  },
  { type: "error", inputs: [], name: "NodeStakedOrDeposited" },
  { type: "error", inputs: [], name: "NotInitializing" },
  { type: "error", inputs: [], name: "PublicGoodNodeNotDeposited" },
  {
    type: "error",
    inputs: [{ name: "nodeAddr", internalType: "address", type: "address" }],
    name: "PublicGoodNodeNotStaked",
  },
  {
    type: "error",
    inputs: [
      { name: "bits", internalType: "uint8", type: "uint8" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "SafeCastOverflowedUintDowncast",
  },
  {
    type: "error",
    inputs: [{ name: "token", internalType: "address", type: "address" }],
    name: "SafeERC20FailedOperation",
  },
  { type: "error", inputs: [], name: "TaxFractionTooLarge" },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "nodeAddr",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
    ],
    name: "Deposited",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "version",
        internalType: "uint64",
        type: "uint64",
        indexed: false,
      },
    ],
    name: "Initialized",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "nodeAddr",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "name", internalType: "string", type: "string", indexed: false },
      {
        name: "description",
        internalType: "string",
        type: "string",
        indexed: false,
      },
      {
        name: "taxFraction",
        internalType: "uint64",
        type: "uint64",
        indexed: false,
      },
      {
        name: "publicGood",
        internalType: "bool",
        type: "bool",
        indexed: false,
      },
    ],
    name: "NodeCreated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "nodeAddr",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "NodeDeleted",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "nodeAddr",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "slashedOperatingPool",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "slashedRewardPool",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
    ],
    name: "NodeSlashed",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "nodeAddr",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "taxFraction",
        internalType: "uint64",
        type: "uint64",
        indexed: true,
      },
    ],
    name: "NodeTaxFractionSet",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "Paused",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "epoch",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "startTimestamp",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "endTimestamp",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "publicPoolReward",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "publicPoolTax",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "PublicGoodRewardDistributed",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "taxFraction",
        internalType: "uint64",
        type: "uint64",
        indexed: true,
      },
    ],
    name: "PublicPoolTaxFractionSet",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "epoch",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "startTimestamp",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "endTimestamp",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "nodeAddrs",
        internalType: "address[]",
        type: "address[]",
        indexed: false,
      },
      {
        name: "requestFees",
        internalType: "uint256[]",
        type: "uint256[]",
        indexed: false,
      },
      {
        name: "requestBonuses",
        internalType: "uint256[]",
        type: "uint256[]",
        indexed: false,
      },
      {
        name: "stakingRewards",
        internalType: "uint256[]",
        type: "uint256[]",
        indexed: false,
      },
      {
        name: "taxAmounts",
        internalType: "uint256[]",
        type: "uint256[]",
        indexed: false,
      },
    ],
    name: "RewardDistributed",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "previousAdminRole",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
      {
        name: "newAdminRole",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
    ],
    name: "RoleAdminChanged",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "RoleGranted",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "RoleRevoked",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "nodeAddr",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "startTokenId",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "endTokenId",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Staked",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "Unpaused",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "requestId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "nodeAddr",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "unstakeAmount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "UnstakeClaimed",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "nodeAddr",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "requestId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "chipsIds",
        internalType: "uint256[]",
        type: "uint256[]",
        indexed: false,
      },
    ],
    name: "UnstakeRequested",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "nodeAddr",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "requestId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
    ],
    name: "WithdrawRequested",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "requestId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
    ],
    name: "WithdrawalClaimed",
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "DEPOSIT_UNBONDING_PERIOD",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "MIN_DEPOSIT",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "NODE_SLASH_FRACTION",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "ORACLE_ROLE",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "PAUSE_ROLE",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "SHARES_PER_CHIP",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "STAKE_RATIO",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "STAKE_UNBONDING_PERIOD",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "TOKEN",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "TREASURY",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "USER_SLASH_FRACTION",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "chipsContract",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "requestIds", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "claimUnstake",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "requestIds", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "claimWithdrawal",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "name", internalType: "string", type: "string" },
      { name: "description", internalType: "string", type: "string" },
      { name: "taxFraction", internalType: "uint64", type: "uint64" },
      { name: "publicGood", internalType: "bool", type: "bool" },
    ],
    name: "createNode",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "name", internalType: "string", type: "string" },
      { name: "description", internalType: "string", type: "string" },
      { name: "taxFraction", internalType: "uint64", type: "uint64" },
      { name: "publicGood", internalType: "bool", type: "bool" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "createNodeAndDeposit",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "currentEpoch",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "nodeAddr", internalType: "address", type: "address" }],
    name: "deleteNode",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "deposit",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "epoch", internalType: "uint256", type: "uint256" },
      { name: "startTimestamp", internalType: "uint256", type: "uint256" },
      { name: "endTimestamp", internalType: "uint256", type: "uint256" },
      { name: "nodeAddrs", internalType: "address[]", type: "address[]" },
      { name: "requestFees", internalType: "uint256[]", type: "uint256[]" },
      { name: "requestBonuses", internalType: "uint256[]", type: "uint256[]" },
      { name: "stakingRewards", internalType: "uint256[]", type: "uint256[]" },
      { name: "publicPoolReward", internalType: "uint256", type: "uint256" },
    ],
    name: "distributeRewards",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
    name: "getChipsInfo",
    outputs: [
      { name: "nodeAddr", internalType: "address", type: "address" },
      { name: "tokens", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getMinDeposit",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "nodeAddr", internalType: "address", type: "address" }],
    name: "getNode",
    outputs: [
      {
        name: "",
        internalType: "struct DataTypes.Node",
        type: "tuple",
        components: [
          { name: "account", internalType: "address", type: "address" },
          { name: "taxFraction", internalType: "uint64", type: "uint64" },
          { name: "publicGood", internalType: "bool", type: "bool" },
          { name: "name", internalType: "string", type: "string" },
          { name: "description", internalType: "string", type: "string" },
          { name: "operatingPool", internalType: "uint256", type: "uint256" },
          { name: "stakingPool", internalType: "uint256", type: "uint256" },
          { name: "totalShares", internalType: "uint256", type: "uint256" },
          { name: "slashedAmount", internalType: "uint256", type: "uint256" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getNodeCount",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "offset", internalType: "uint256", type: "uint256" },
      { name: "limit", internalType: "uint256", type: "uint256" },
    ],
    name: "getNodes",
    outputs: [
      {
        name: "nodes",
        internalType: "struct DataTypes.Node[]",
        type: "tuple[]",
        components: [
          { name: "account", internalType: "address", type: "address" },
          { name: "taxFraction", internalType: "uint64", type: "uint64" },
          { name: "publicGood", internalType: "bool", type: "bool" },
          { name: "name", internalType: "string", type: "string" },
          { name: "description", internalType: "string", type: "string" },
          { name: "operatingPool", internalType: "uint256", type: "uint256" },
          { name: "stakingPool", internalType: "uint256", type: "uint256" },
          { name: "totalShares", internalType: "uint256", type: "uint256" },
          { name: "slashedAmount", internalType: "uint256", type: "uint256" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "requestId", internalType: "uint256", type: "uint256" }],
    name: "getPendingUnstake",
    outputs: [
      {
        name: "",
        internalType: "struct DataTypes.UnstakeRequest",
        type: "tuple",
        components: [
          { name: "owner", internalType: "address", type: "address" },
          { name: "nodeAddr", internalType: "address", type: "address" },
          { name: "timestamp", internalType: "uint256", type: "uint256" },
          { name: "unstakeAmount", internalType: "uint256", type: "uint256" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "requestId", internalType: "uint256", type: "uint256" }],
    name: "getPendingWithdrawal",
    outputs: [
      {
        name: "",
        internalType: "struct DataTypes.WithdrawalRequest",
        type: "tuple",
        components: [
          { name: "owner", internalType: "address", type: "address" },
          { name: "timestamp", internalType: "uint40", type: "uint40" },
          { name: "amount", internalType: "uint256", type: "uint256" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getPoolInfo",
    outputs: [
      { name: "totalOperatingPool", internalType: "uint256", type: "uint256" },
      { name: "totalStakingPool", internalType: "uint256", type: "uint256" },
      { name: "treasuryAmount", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getPublicPool",
    outputs: [
      {
        name: "",
        internalType: "struct DataTypes.Node",
        type: "tuple",
        components: [
          { name: "account", internalType: "address", type: "address" },
          { name: "taxFraction", internalType: "uint64", type: "uint64" },
          { name: "publicGood", internalType: "bool", type: "bool" },
          { name: "name", internalType: "string", type: "string" },
          { name: "description", internalType: "string", type: "string" },
          { name: "operatingPool", internalType: "uint256", type: "uint256" },
          { name: "stakingPool", internalType: "uint256", type: "uint256" },
          { name: "totalShares", internalType: "uint256", type: "uint256" },
          { name: "slashedAmount", internalType: "uint256", type: "uint256" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "role", internalType: "bytes32", type: "bytes32" }],
    name: "getRoleAdmin",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "index", internalType: "uint256", type: "uint256" },
    ],
    name: "getRoleMember",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "role", internalType: "bytes32", type: "bytes32" }],
    name: "getRoleMemberCount",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "grantRole",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "hasRole",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "chips", internalType: "address", type: "address" },
      { name: "pauseAccount", internalType: "address", type: "address" },
      { name: "oracleAccount", internalType: "address", type: "address" },
    ],
    name: "initialize",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "nodeAddr", internalType: "address", type: "address" }],
    name: "minTokensToStake",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [],
    name: "pause",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "paused",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "callerConfirmation", internalType: "address", type: "address" },
    ],
    name: "renounceRole",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "nodeAddr", internalType: "address", type: "address" },
      { name: "chipsIds", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "requestUnstake",
    outputs: [{ name: "requestId", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "chipsIds", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "requestUnstakeFromPublicPool",
    outputs: [{ name: "requestId", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "requestWithdrawal",
    outputs: [{ name: "requestId", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "revokeRole",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "nodeAddr", internalType: "address", type: "address" },
      { name: "taxFraction", internalType: "uint64", type: "uint64" },
    ],
    name: "setTaxFraction4Node",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "taxFraction", internalType: "uint64", type: "uint64" }],
    name: "setTaxFraction4PublicPool",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "nodeAddrs", internalType: "address[]", type: "address[]" },
    ],
    name: "slashNodes",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "nodeAddr", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "stake",
    outputs: [
      { name: "startTokenId", internalType: "uint256", type: "uint256" },
      { name: "endTokenId", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "nodeAddr", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "stakeToPublicPool",
    outputs: [
      { name: "startTokenId", internalType: "uint256", type: "uint256" },
      { name: "endTokenId", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "stakingToken",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [],
    name: "unpause",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [],
    name: "withdraw2Treasury",
    outputs: [],
  },
] as const

/**
 *
 */
export const stakingAddress = {
  2333: "0x2dFb8d13b07B34eeD22E9EA840eAeA6B300fee9f",
} as const

/**
 *
 */
export const stakingConfig = {
  address: stakingAddress,
  abi: stakingAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rss3TokenAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98d64da73a6616c42117b582e832812e7b8d57f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x568F64582A377ea52d0067c4E430B9aE22A60473)
 */
export const useReadRss3Token = /*#__PURE__*/ createUseReadContract({
  abi: rss3TokenAbi,
  address: rss3TokenAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98d64da73a6616c42117b582e832812e7b8d57f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x568F64582A377ea52d0067c4E430B9aE22A60473)
 */
export const useReadRss3TokenAllowance = /*#__PURE__*/ createUseReadContract({
  abi: rss3TokenAbi,
  address: rss3TokenAddress,
  functionName: "allowance",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98d64da73a6616c42117b582e832812e7b8d57f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x568F64582A377ea52d0067c4E430B9aE22A60473)
 */
export const useReadRss3TokenBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: rss3TokenAbi,
  address: rss3TokenAddress,
  functionName: "balanceOf",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"decimals"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98d64da73a6616c42117b582e832812e7b8d57f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x568F64582A377ea52d0067c4E430B9aE22A60473)
 */
export const useReadRss3TokenDecimals = /*#__PURE__*/ createUseReadContract({
  abi: rss3TokenAbi,
  address: rss3TokenAddress,
  functionName: "decimals",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98d64da73a6616c42117b582e832812e7b8d57f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x568F64582A377ea52d0067c4E430B9aE22A60473)
 */
export const useReadRss3TokenName = /*#__PURE__*/ createUseReadContract({
  abi: rss3TokenAbi,
  address: rss3TokenAddress,
  functionName: "name",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98d64da73a6616c42117b582e832812e7b8d57f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x568F64582A377ea52d0067c4E430B9aE22A60473)
 */
export const useReadRss3TokenSymbol = /*#__PURE__*/ createUseReadContract({
  abi: rss3TokenAbi,
  address: rss3TokenAddress,
  functionName: "symbol",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98d64da73a6616c42117b582e832812e7b8d57f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x568F64582A377ea52d0067c4E430B9aE22A60473)
 */
export const useReadRss3TokenTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: rss3TokenAbi,
  address: rss3TokenAddress,
  functionName: "totalSupply",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rss3TokenAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98d64da73a6616c42117b582e832812e7b8d57f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x568F64582A377ea52d0067c4E430B9aE22A60473)
 */
export const useWriteRss3Token = /*#__PURE__*/ createUseWriteContract({
  abi: rss3TokenAbi,
  address: rss3TokenAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98d64da73a6616c42117b582e832812e7b8d57f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x568F64582A377ea52d0067c4E430B9aE22A60473)
 */
export const useWriteRss3TokenApprove = /*#__PURE__*/ createUseWriteContract({
  abi: rss3TokenAbi,
  address: rss3TokenAddress,
  functionName: "approve",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98d64da73a6616c42117b582e832812e7b8d57f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x568F64582A377ea52d0067c4E430B9aE22A60473)
 */
export const useWriteRss3TokenTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: rss3TokenAbi,
  address: rss3TokenAddress,
  functionName: "transfer",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98d64da73a6616c42117b582e832812e7b8d57f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x568F64582A377ea52d0067c4E430B9aE22A60473)
 */
export const useWriteRss3TokenTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: rss3TokenAbi,
    address: rss3TokenAddress,
    functionName: "transferFrom",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rss3TokenAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98d64da73a6616c42117b582e832812e7b8d57f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x568F64582A377ea52d0067c4E430B9aE22A60473)
 */
export const useSimulateRss3Token = /*#__PURE__*/ createUseSimulateContract({
  abi: rss3TokenAbi,
  address: rss3TokenAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98d64da73a6616c42117b582e832812e7b8d57f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x568F64582A377ea52d0067c4E430B9aE22A60473)
 */
export const useSimulateRss3TokenApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rss3TokenAbi,
    address: rss3TokenAddress,
    functionName: "approve",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98d64da73a6616c42117b582e832812e7b8d57f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x568F64582A377ea52d0067c4E430B9aE22A60473)
 */
export const useSimulateRss3TokenTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rss3TokenAbi,
    address: rss3TokenAddress,
    functionName: "transfer",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98d64da73a6616c42117b582e832812e7b8d57f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x568F64582A377ea52d0067c4E430B9aE22A60473)
 */
export const useSimulateRss3TokenTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rss3TokenAbi,
    address: rss3TokenAddress,
    functionName: "transferFrom",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rss3TokenAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98d64da73a6616c42117b582e832812e7b8d57f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x568F64582A377ea52d0067c4E430B9aE22A60473)
 */
export const useWatchRss3TokenEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: rss3TokenAbi, address: rss3TokenAddress },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rss3TokenAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98d64da73a6616c42117b582e832812e7b8d57f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x568F64582A377ea52d0067c4E430B9aE22A60473)
 */
export const useWatchRss3TokenApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rss3TokenAbi,
    address: rss3TokenAddress,
    eventName: "Approval",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rss3TokenAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98d64da73a6616c42117b582e832812e7b8d57f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x568F64582A377ea52d0067c4E430B9aE22A60473)
 */
export const useWatchRss3TokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rss3TokenAbi,
    address: rss3TokenAddress,
    eventName: "Transfer",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__
 *
 *
 */
export const useReadStaking = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 *
 *
 */
export const useReadStakingDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "DEFAULT_ADMIN_ROLE",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"DEPOSIT_UNBONDING_PERIOD"`
 *
 *
 */
export const useReadStakingDepositUnbondingPeriod =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "DEPOSIT_UNBONDING_PERIOD",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"MIN_DEPOSIT"`
 *
 *
 */
export const useReadStakingMinDeposit = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "MIN_DEPOSIT",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"NODE_SLASH_FRACTION"`
 *
 *
 */
export const useReadStakingNodeSlashFraction =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "NODE_SLASH_FRACTION",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"ORACLE_ROLE"`
 *
 *
 */
export const useReadStakingOracleRole = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "ORACLE_ROLE",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"PAUSE_ROLE"`
 *
 *
 */
export const useReadStakingPauseRole = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "PAUSE_ROLE",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"SHARES_PER_CHIP"`
 *
 *
 */
export const useReadStakingSharesPerChip = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "SHARES_PER_CHIP",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"STAKE_RATIO"`
 *
 *
 */
export const useReadStakingStakeRatio = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "STAKE_RATIO",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"STAKE_UNBONDING_PERIOD"`
 *
 *
 */
export const useReadStakingStakeUnbondingPeriod =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "STAKE_UNBONDING_PERIOD",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"TOKEN"`
 *
 *
 */
export const useReadStakingToken = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "TOKEN",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"TREASURY"`
 *
 *
 */
export const useReadStakingTreasury = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "TREASURY",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"USER_SLASH_FRACTION"`
 *
 *
 */
export const useReadStakingUserSlashFraction =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "USER_SLASH_FRACTION",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"chipsContract"`
 *
 *
 */
export const useReadStakingChipsContract = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "chipsContract",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"currentEpoch"`
 *
 *
 */
export const useReadStakingCurrentEpoch = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "currentEpoch",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"getChipsInfo"`
 *
 *
 */
export const useReadStakingGetChipsInfo = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "getChipsInfo",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"getMinDeposit"`
 *
 *
 */
export const useReadStakingGetMinDeposit = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "getMinDeposit",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"getNode"`
 *
 *
 */
export const useReadStakingGetNode = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "getNode",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"getNodeCount"`
 *
 *
 */
export const useReadStakingGetNodeCount = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "getNodeCount",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"getNodes"`
 *
 *
 */
export const useReadStakingGetNodes = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "getNodes",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"getPendingUnstake"`
 *
 *
 */
export const useReadStakingGetPendingUnstake =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "getPendingUnstake",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"getPendingWithdrawal"`
 *
 *
 */
export const useReadStakingGetPendingWithdrawal =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "getPendingWithdrawal",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"getPoolInfo"`
 *
 *
 */
export const useReadStakingGetPoolInfo = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "getPoolInfo",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"getPublicPool"`
 *
 *
 */
export const useReadStakingGetPublicPool = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "getPublicPool",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"getRoleAdmin"`
 *
 *
 */
export const useReadStakingGetRoleAdmin = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "getRoleAdmin",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"getRoleMember"`
 *
 *
 */
export const useReadStakingGetRoleMember = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "getRoleMember",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"getRoleMemberCount"`
 *
 *
 */
export const useReadStakingGetRoleMemberCount =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "getRoleMemberCount",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"hasRole"`
 *
 *
 */
export const useReadStakingHasRole = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "hasRole",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"minTokensToStake"`
 *
 *
 */
export const useReadStakingMinTokensToStake =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "minTokensToStake",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"paused"`
 *
 *
 */
export const useReadStakingPaused = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "paused",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"stakingToken"`
 *
 *
 */
export const useReadStakingStakingToken = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "stakingToken",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"supportsInterface"`
 *
 *
 */
export const useReadStakingSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "supportsInterface",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__
 *
 *
 */
export const useWriteStaking = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"claimUnstake"`
 *
 *
 */
export const useWriteStakingClaimUnstake = /*#__PURE__*/ createUseWriteContract(
  { abi: stakingAbi, address: stakingAddress, functionName: "claimUnstake" },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"claimWithdrawal"`
 *
 *
 */
export const useWriteStakingClaimWithdrawal =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "claimWithdrawal",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"createNode"`
 *
 *
 */
export const useWriteStakingCreateNode = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "createNode",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"createNodeAndDeposit"`
 *
 *
 */
export const useWriteStakingCreateNodeAndDeposit =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "createNodeAndDeposit",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"deleteNode"`
 *
 *
 */
export const useWriteStakingDeleteNode = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "deleteNode",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"deposit"`
 *
 *
 */
export const useWriteStakingDeposit = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "deposit",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"distributeRewards"`
 *
 *
 */
export const useWriteStakingDistributeRewards =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "distributeRewards",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"grantRole"`
 *
 *
 */
export const useWriteStakingGrantRole = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "grantRole",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"initialize"`
 *
 *
 */
export const useWriteStakingInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "initialize",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"pause"`
 *
 *
 */
export const useWriteStakingPause = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "pause",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"renounceRole"`
 *
 *
 */
export const useWriteStakingRenounceRole = /*#__PURE__*/ createUseWriteContract(
  { abi: stakingAbi, address: stakingAddress, functionName: "renounceRole" },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"requestUnstake"`
 *
 *
 */
export const useWriteStakingRequestUnstake =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "requestUnstake",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"requestUnstakeFromPublicPool"`
 *
 *
 */
export const useWriteStakingRequestUnstakeFromPublicPool =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "requestUnstakeFromPublicPool",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"requestWithdrawal"`
 *
 *
 */
export const useWriteStakingRequestWithdrawal =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "requestWithdrawal",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"revokeRole"`
 *
 *
 */
export const useWriteStakingRevokeRole = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "revokeRole",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"setTaxFraction4Node"`
 *
 *
 */
export const useWriteStakingSetTaxFraction4Node =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "setTaxFraction4Node",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"setTaxFraction4PublicPool"`
 *
 *
 */
export const useWriteStakingSetTaxFraction4PublicPool =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "setTaxFraction4PublicPool",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"slashNodes"`
 *
 *
 */
export const useWriteStakingSlashNodes = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "slashNodes",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"stake"`
 *
 *
 */
export const useWriteStakingStake = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "stake",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"stakeToPublicPool"`
 *
 *
 */
export const useWriteStakingStakeToPublicPool =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "stakeToPublicPool",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"unpause"`
 *
 *
 */
export const useWriteStakingUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "unpause",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"withdraw2Treasury"`
 *
 *
 */
export const useWriteStakingWithdraw2Treasury =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "withdraw2Treasury",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__
 *
 *
 */
export const useSimulateStaking = /*#__PURE__*/ createUseSimulateContract({
  abi: stakingAbi,
  address: stakingAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"claimUnstake"`
 *
 *
 */
export const useSimulateStakingClaimUnstake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "claimUnstake",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"claimWithdrawal"`
 *
 *
 */
export const useSimulateStakingClaimWithdrawal =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "claimWithdrawal",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"createNode"`
 *
 *
 */
export const useSimulateStakingCreateNode =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "createNode",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"createNodeAndDeposit"`
 *
 *
 */
export const useSimulateStakingCreateNodeAndDeposit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "createNodeAndDeposit",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"deleteNode"`
 *
 *
 */
export const useSimulateStakingDeleteNode =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "deleteNode",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"deposit"`
 *
 *
 */
export const useSimulateStakingDeposit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "deposit",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"distributeRewards"`
 *
 *
 */
export const useSimulateStakingDistributeRewards =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "distributeRewards",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"grantRole"`
 *
 *
 */
export const useSimulateStakingGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "grantRole",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"initialize"`
 *
 *
 */
export const useSimulateStakingInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "initialize",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"pause"`
 *
 *
 */
export const useSimulateStakingPause = /*#__PURE__*/ createUseSimulateContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "pause",
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"renounceRole"`
 *
 *
 */
export const useSimulateStakingRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "renounceRole",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"requestUnstake"`
 *
 *
 */
export const useSimulateStakingRequestUnstake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "requestUnstake",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"requestUnstakeFromPublicPool"`
 *
 *
 */
export const useSimulateStakingRequestUnstakeFromPublicPool =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "requestUnstakeFromPublicPool",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"requestWithdrawal"`
 *
 *
 */
export const useSimulateStakingRequestWithdrawal =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "requestWithdrawal",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"revokeRole"`
 *
 *
 */
export const useSimulateStakingRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "revokeRole",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"setTaxFraction4Node"`
 *
 *
 */
export const useSimulateStakingSetTaxFraction4Node =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "setTaxFraction4Node",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"setTaxFraction4PublicPool"`
 *
 *
 */
export const useSimulateStakingSetTaxFraction4PublicPool =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "setTaxFraction4PublicPool",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"slashNodes"`
 *
 *
 */
export const useSimulateStakingSlashNodes =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "slashNodes",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"stake"`
 *
 *
 */
export const useSimulateStakingStake = /*#__PURE__*/ createUseSimulateContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "stake",
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"stakeToPublicPool"`
 *
 *
 */
export const useSimulateStakingStakeToPublicPool =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "stakeToPublicPool",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"unpause"`
 *
 *
 */
export const useSimulateStakingUnpause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "unpause",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"withdraw2Treasury"`
 *
 *
 */
export const useSimulateStakingWithdraw2Treasury =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "withdraw2Treasury",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__
 *
 *
 */
export const useWatchStakingEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakingAbi,
  address: stakingAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"Deposited"`
 *
 *
 */
export const useWatchStakingDepositedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: "Deposited",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"Initialized"`
 *
 *
 */
export const useWatchStakingInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: "Initialized",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"NodeCreated"`
 *
 *
 */
export const useWatchStakingNodeCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: "NodeCreated",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"NodeDeleted"`
 *
 *
 */
export const useWatchStakingNodeDeletedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: "NodeDeleted",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"NodeSlashed"`
 *
 *
 */
export const useWatchStakingNodeSlashedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: "NodeSlashed",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"NodeTaxFractionSet"`
 *
 *
 */
export const useWatchStakingNodeTaxFractionSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: "NodeTaxFractionSet",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"Paused"`
 *
 *
 */
export const useWatchStakingPausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: "Paused",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"PublicGoodRewardDistributed"`
 *
 *
 */
export const useWatchStakingPublicGoodRewardDistributedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: "PublicGoodRewardDistributed",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"PublicPoolTaxFractionSet"`
 *
 *
 */
export const useWatchStakingPublicPoolTaxFractionSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: "PublicPoolTaxFractionSet",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"RewardDistributed"`
 *
 *
 */
export const useWatchStakingRewardDistributedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: "RewardDistributed",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"RoleAdminChanged"`
 *
 *
 */
export const useWatchStakingRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: "RoleAdminChanged",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"RoleGranted"`
 *
 *
 */
export const useWatchStakingRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: "RoleGranted",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"RoleRevoked"`
 *
 *
 */
export const useWatchStakingRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: "RoleRevoked",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"Staked"`
 *
 *
 */
export const useWatchStakingStakedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: "Staked",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"Unpaused"`
 *
 *
 */
export const useWatchStakingUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: "Unpaused",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"UnstakeClaimed"`
 *
 *
 */
export const useWatchStakingUnstakeClaimedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: "UnstakeClaimed",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"UnstakeRequested"`
 *
 *
 */
export const useWatchStakingUnstakeRequestedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: "UnstakeRequested",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"WithdrawRequested"`
 *
 *
 */
export const useWatchStakingWithdrawRequestedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: "WithdrawRequested",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"WithdrawalClaimed"`
 *
 *
 */
export const useWatchStakingWithdrawalClaimedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: "WithdrawalClaimed",
  })
