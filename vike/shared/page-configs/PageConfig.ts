export type { PageConfig }
export type { PageConfigLoaded }
export type { PageConfigSerialized }
export type { PageConfigBuildTime }
export type { ConfigEnvInternal }
export type { ConfigEnv }
export type { PageConfigGlobal }
export type { PageConfigGlobalAtBuildTime }
export type { PageConfigGlobalSerialized }
export type { ConfigSource }
export type { ConfigValue }
export type { ConfigValueSerialized }
export type { ConfigValueImported }
export type { ConfigValues }
export type { ConfigValueSource }
export type { ConfigValueSources }
export type { DefinedAtInfo }
export type { DefinedAtInfoFull }

/** PageConfig data structure at runtime */
type PageConfig = PageConfigBase & {
  configValues: ConfigValues
  /** Config values loaded/imported lazily */
  loadConfigValuesAll: LoadConfigValuesAll
  /** Whether loadConfigValuesAll() was already called */
  isLoaded?: true
}
type PageConfigLoaded = PageConfig & {
  isLoaded: true
}
/** PageConfig data structure at build-time */
type PageConfigBuildTime = PageConfigBase & {
  configValues: ConfigValues
  configValueSources: ConfigValueSources
}
type PageConfigBase = {
  pageId: string
  isErrorPage: boolean
  routeFilesystem: null | {
    routeString: string
    definedBy: string
  }
}
/** PageConfig data structure serialized in virtual files: parsing results in the runtime PageConfig data structure */
type PageConfigSerialized = PageConfigBase & {
  configValuesSerialized: Record<string, ConfigValueSerialized>
  /** Config values loaded/imported eagerly */
  configValuesImported: ConfigValueImported[]
  loadConfigValuesAll: LoadConfigValuesAll
}

type PageConfigGlobal = {
  configValues: ConfigValues
}
type PageConfigGlobalSerialized = {
  configValuesImported: ConfigValueImported[]
}
type PageConfigGlobalAtBuildTime = {
  configValueSources: ConfigValueSources
}

type ConfigEnv = 'client-only' | 'server-only' | 'server-and-client' | 'config-only'
type ConfigEnvInternal = ConfigEnv | '_routing-eager' | '_routing-lazy'
type ConfigValueSource = {
  configEnv: ConfigEnvInternal
  value?: unknown
  // For example: config.Page or config.onBeforeRender
  valueIsImportedAtRuntime: boolean
  // For config.client
  valueIsFilePath?: true
} & (
  | {
      isComputed: false
      definedAtInfo: DefinedAtInfo
      /* TODO: use it
      definedAtInfo: DefinedAtInfoFull
      */
    }
  | {
      isComputed: true
      definedAtInfo: null
      valueIsImportedAtRuntime: false
    }
)
type ConfigValueSources = Record<
  // configName
  string,
  ConfigValueSource[]
>
type ConfigValue = {
  value: unknown
  // Is null when config value is:
  //  - computed, or
  //  - cumulative
  // TODO: replace with filePathToShowToUser
  definedAtInfo: null | DefinedAtInfo
}
type ConfigValueSerialized = {
  valueSerialized: string
  definedAtInfo: null | DefinedAtInfo
}

type ConfigValues = Record<
  // configName
  string,
  ConfigValue
>
type DefinedAtInfo = {
  filePath: string
  fileExportPath: string[]
}
type DefinedAtInfoFull = {
  filePathRelativeToUserRootDir?: string
  filePathAbsolute: string
  fileExportPath: string[]
}

type ConfigSource = { configSourceFile: string } & (
  | { configSourceFileExportName: string; configSourceFileDefaultExportKey?: undefined }
  | { configSourceFileDefaultExportKey: string; configSourceFileExportName?: undefined }
)

type LoadConfigValuesAll = () => Promise<ConfigValueImported[]>
type ConfigValueImported = {
  configName: string
  // TODO: rename?
  importPath: string
} & (
  | {
      isValueFile: true // importPath is a +{configName}.js file
      // TODO: rename?
      importFileExports: Record<string, unknown>
    }
  | {
      isValueFile: false // importPath is imported by a +config.js file
      // TODO: rename?
      // import { something } from './importPathRelative.js'
      // -> exportName === 'something'
      // -> importFileExportValue holds the value of `something`
      exportName: string
      importFileExportValue: unknown
    }
)
