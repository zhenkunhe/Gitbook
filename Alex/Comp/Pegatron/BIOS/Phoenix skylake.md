# Phoenix skylake

[TOC]

## BIOS Menu

hfr->bios menu
CpuSetup.c -> MSR存取值(ex:MSR->TempMsr->PowerLimitInteger,PowerLimitFraction->STR_LONG_DUR_PWR_LIMIT_VALUE->PlatformSetup.hfr)

BIOS Menu & asl:
Option VAIO_SETUP_DEBUG_MENU_DONT_HIDE, 1

## projectOIL.def

GloblNvsArea_Def.h -> 寫入asl前的架構
DxeAcpiGnvsInitLib.c ->asl架構初始化
AcpiPlatform.c
  case (SIGNATURE_32 ('G', 'N', 'V', 'S'))://將此asl空間指向一個結構&mGlobalNvsArea.Area

  呼叫DxeAcpiGnvsInitLib.c的AcpiGnvsInit，將mGlobalNvsArea.Area初始化

  BIOS menu setting(PlatformSetup.hfr)覆蓋掉初始值 & 寫入asl
  VarDataSize = sizeof (SETUP_DATA);
  Status = gRT->GetVariable (
                  L"Setup",
                  &gSetupVariableGuid,
                  NULL,
                  &VarDataSize,
                  &mSystemConfiguration
                  );
  建立結構介面PNVS
  Status = gBS->InstallMultipleProtocolInterfaces (
                  &Handle,
                  &gEfiGlobalNvsAreaProtocolGuid,
                  &mGlobalNvsArea,
                  NULL
                  );
GloblNvs.asl -> offset

-------------------------------------------
(&gCpuSetupVariableGuid)(&gSetupVariableGuid)(gRT->SetVariable)(gRT->GetVariable)
BIOS menu -> PeiCpuPolicyInit.c -> PeiCpuPolicyUpdate.c..............(CpuGlobalNvsArea.h & PowerMgmtNvsStruct.h)結構

->PowerMgmtInitPeim.c
->PowerLimits.c (BIOS 寫入，再客製化資料MSR Overrides & MMIO Overrides)
->CpuGlobalNvsArea.h offset .h
->Cpussdt.asl -> offset
(Nominal.Down.Up)

## MiscFunctions.c

  SIGNATURE_32 ('P', 'N', 'V', 'S')://將此asl空間指向一個結構gCpuGlobalNvsAreaProtocol->Area
Cpussdt.asl -> offset

## PostCode

Store(0xFF,P80H)
Store(0x60,P80H)
//P8XH(0,0x02)      // Output information to Port 80h.
//P8XH(1,0x03)

## 傳統的BIOS

//#define DEF_VIEW_TYPE METRO_VIEW 傳統的uefi

## LegacyModeSupport? PEGALib.c? BootManager.c?

phoenix - 45 :pch setup BIOS menu

\MPL0
\_PR.PL12
ec command => project.h
sncx method => sncxAslDefs.h

ME ->Project.mak
ProjectOIL.def

PpccStepSize

Cpussdt -> offset

Powerlimits.c
PerformanceStates.c
PowerMgmtInitPeim.c

SLP_S3#(SUS_C)、SLP_S4# (SUS_B)
up-SNCX(客人提供，純SW)-down
deep S3 deep S4 - 沒插AC(更省)(project.def可以控制)

PowerMgmtInitPeim.c -> IdleStates.c C-state開關

## EIST (Enhanced Intel SpeedStep Technology) GV3

MSR_IA32_MISC_ENABLE (1A0h) [16] [38](Turbo enable)
MSR MISC_PWR_MGMT (1AAh) [0].  To Enable Enhanced Intel SpeedStep Technology Hardware coordination, clear
MSR PLATFORM_INFO (CEh) [47:40].Max Efficiency Ratio
MSR PLATFORM_INFO (CEh) [15:8]. Max Non-Turbo Ratio (P1)

BSP to the Max Non-Turbo Ratio (P1).  Program the Maximum Non-Turbo Ratio (P1) in MSR IA32_PERF_CTL (199h) [14:8].
Force all processors other than the System BSP to the lowest P-state   Max Efficiency Ratio into the MSR IA32_PERF_CTRL (199h) [14:8]. his is also referred to as Max efficiency boot.

_PPC: method,return max P-state available
_PCT: declares an I/O interface mapped MSRs for status and control PERF_CTRL & PERF_STATUS
_PSS: Lists the possible processor frequency and voltage operating states intel 會給公式，照公式填表。OS要轉變狀態時，會對照這個表然後填入到MSR內  因此此表的值 必須要與PERF_STATUS的值相等
    //   Package {
    //     CoreFrequency     // Integer (DWORD)
    //     Power             // Integer (DWORD)
    //     Latency           // Integer (DWORD)
    //     BusMasterLatency  // Integer (DWORD)
    //     Control           // Integer (DWORD)
    //     Status            // Integer (DWORD)
    //   }

_PSD :P-state Depth Limit

## FLEX_RATIO

MSR FLEX_RATIO (194h) [16] Flex Ratio support on Client processors can be verified by reading
MSR FLEX_RATIO (194h) [15:8] target Ratio

## Flex Ratio and Config TDP

PLATFORM_INFO[15:8] = min(PLATFORM_INFO[15:8], flex ratio)
CONFIG_TDP_NOMINAL[7:0]=min(CONFIG_TDP_NOMINAL[7:0], flex ratio)
CONFIG_TDP_LEVEL1[23:16]=min(CONFIG_TDP_LEVEL1[23:16], flex ratio)
CONFIG_TDP_LEVEL2[23:16]=min(CONFIG_TDP_LEVEL2[23:16], flex ratio)

## Boot Ratio

Write PCH Soft reset data register [12] Set to enable Maximum Non-Turbo Ratio(P1)boot
Write I/O CF9h = 06h NA Issues a warm reset

## Number of Operating Points

MaxNonTurboRatio = PLATFORM_INFO bits [15:8]
MaxEfficiencyRatio = PLATFORM_INFO bits [47:40]
RatioRange = MaxNonTurboRatio - MaxEfficiencyRatio
RatioStepSize = 1
NumStates=Floor((RatioRange / RatioStepSize) + 1
If Turbo Mode is available and enabled
Then NumStates = NumStates + 1
If (NumStates > 16)
Then RatioStepSize = RatioStepSize + 1
And NumStates = Floor((RatioRange / RatioStepSize) + 1
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
Intel is recommending to disable HWP for Overclocking platforms. During the first year of the Skylake launch, overclocking SW as well as BIOS will be modified to allow overclocking and HWP to coexist.

The highest P state (P0) is dependent on the OC Ratio programmed by the OC Mailbox Command 11h.(Incase of overclocked parts this is read by BIOS
using the OC_MAILBOX_READ_PER_CORE_RATIO_LIMITS_CAPABILITY_CMD mailbox command.)

Starting with Windows* 10, a new mechanism for OS P state control is available. This mechanism replaces the legacy P state architecture:
‧ IA32_PERF_CTL – MSR 199h.
‧ ENERGY_PERFORMANCE_BIAS - MSR 1B0h

The new interface is controlled by the following registers:
‧ MISC_PWR_MGMT – MST 1AAh bit 6 – enumerate HWP for the OS.
‧ IA32_PM_ENABLE – MSR 770h (enable HWP by the OS)
‧ HWP_REQUEST – MSR 774h (OS runtime requests)

IRP state - address
CMP = Core Multi-Processing

－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
BoardLcdPanel.c(101階)-> driver.c(Key word:BCLM 20階) -> IgfxOpRn.asl (BCLM 20階) ->
Igfx.asl -> _BCL
IgdOpRegion.c ->

BCLM[0]=32773  0%   5
BCLM[1]=34065  5%
BCLM[2]=35358 10%  1E
BCLM[3]=36649 15%  29
BCLM[4]=38201 21%  39
BCLM[5]=39494 26%  46
BCLM[6]=40786 31%  52
BCLM[7]=42079 36%
BCLM[8]=43371 41%
BCLM[9]=44922 47%
BCLM[10]=46215 52%
BCLM[11]=47766 58%
BCLM[12]=49058 63%
BCLM[13]=50351 68%
BCLM[14]=51643 73%
BCLM[15]=53194 79%
BCLM[16]=54487 84%
BCLM[17]=55779 89%
BCLM[18]=57330 95%  F2
BCLM[19]=58621 100% FD

## Post Code

PostCode.def -> code table
Postcode_Definitions.def -> code table
port:80

Example:

```c
      IoWrite32 ((UINTN) (ABase + R_PCH_ACPI_PM1_CNT), Data32);    <-------- system hang up.
      // 以下code不會跑到.
      { // alec. debug
        UINT32 aa;
        for (aa=0 ; aa<0xc7000 ; aa++)
          _outpw(0x80, 0x4444);
      } // alec. debug
```

Post Code:
<SCT P_CCOSTCODE>:
asl:P8XH,P80H

XXXX -> A3CE -> Hang on"7C7C" -> 7C03
force shutdown
Hang on 82C6

## UVP

5.9V->5.2V

## Smbios PnP command

SmmSmbios.c

## PCH Stepping

C1 or C0

## CCCC

SmmControlDriver.c
Advanced Configuration and Power Interface (ACPI)
Advanced Power Management (APM).

## PsysPL

PowerLimits.c (ConfigurePlatformPowerLimits)->
MiscFunctions.c (InitMiscFeatures) ->
PowerMgmtInitPeim.c (InitPpm) ->
PowerMgmtInitPeim.c (CpuPowerMgmtInit)
//PEGA
//ALEX
//WORKARROUND:Enable PsysPL when S3 resume.
    PlatformPowerLimitMsr.Qword = AsmReadMsr64 (MSR_PLATFORM_POWER_LIMIT);
 PlatformPowerLimitMsr.Dwords.Low |= B_POWER_LIMIT_ENABLE;
 PlatformPowerLimitMsr.Dwords.High |= B_POWER_LIMIT_ENABLE;
 AsmWriteMsr64 (MSR_PLATFORM_POWER_LIMIT, PlatformPowerLimitMsr.Qword);

## TPM PPI FLAG

According to \SecurityPkg\Include\Guid\PhysicalPresenceData.h

```cpp
#define PHYSICAL_PRESENCE_FLAGS_VARIABLE L"PhysicalPresenceFlags"
typedef struct {
UINT8 PPFlags;
} EFI_PHYSICAL_PRESENCE_FLAGS;

//
// The definition bit of the TPM Management Flags
//
#define FLAG_NO_PPI_PROVISION BIT0
#define FLAG_NO_PPI_CLEAR BIT1
#define FLAG_NO_PPI_MAINTENANCE BIT2
#define FLAG_RESET_TRACK BIT3
```

I checked the value of PhysicalPresenceFlags variable is 0x01.
The value 0x01 seems mean ,
NoPPIProvision = True.
NoPPIClear = False.
NoPPIMaintenance = False.

You can use dmpstore command to check "PhysicalPresenceFlags" variable under EFI shell environment.

## PsysPL:PMON Slope & Offset & PMax

CpuInitPreResetCpl.c

## Key

ProjectOIL.def
Option VAIO_CAPSULE_KEY, 0                 // Enable for sign PrivateKey by VAIO

// Specify SCT Public Key file path and name to install public key to capsule file at build time.
Config PTKK_CAPSULE_FILE_PUB_FILE, "$(PROJ_DIR)\SctPublicKey.bin"

// Specify VAIO Public Key file path and name to install public key to capsule file at build time.
//Config VAIO_CAPSULE_FILE_PUB_FILE, "$(PROJ_DIR)\VAIOPublicKey.bin"

## SMI

SmmPlatform.c (註冊SW SMI)
  SwContext.SwSmiInputValue = ALEX_GG_TEST;(你要放的呼叫號碼，如0xF2)
  Status = SwDispatch->Register (
                         SwDispatch,
                         AlexGGTestSmiCallback,(函式所在)
                         &SwContext,
                         &SwHandle
                         );
Store(0xF2,\SSMP) (在asl存號碼到一個變數，觸發SW smi)

## Winfu64.exe

update ME無法reHost Me - boot? -> 需要Globle reset?

## Power Button

PowerButtonHook.c
PowerButtonCallback

## PsysPL3

CpuCommonLib.c (mMilliSecondsToMsrValueMapTable)

## SNCX

Sncx -> asl -> EC
Sncx.asl (Method(SNFD, 1))->
Sncx122.ThermalProfile.asi->
SncxOemMethods.asi

## OS電源計劃控制

cmd:powercfg
//AC mode lid闔上時，do nothing
EX:/SETACVALUEINDEX eb2cd6c2-c8db-43b6-b961-a11faca19359 4f971e89-eebd-4455-a8de-9e59040e7347 5ca83367-6e45-459f-a27b-476b1d01c936 000
