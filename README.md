# ZKOPRU extension wallet

Browser extension wallet for [zkopru](https://github.com/zkopru-network/zkopru).

# Background

# Local development guide

**WARNING: Currently, zkopru extension wallet supports only firefox. Zkopru client implementation does not run inside service worker context which background scripts of chrome extensions run.**

## Setup ZKOPRU

ZKOPRU extension wallet runs zkopru client inside browser extension context. It connects to zkopru coordinator to watch zkopru chain. To develop extension wallet locally, you need to setup and run zkopru coordinator.

1. Setup local zkopru coordiator by following [this documentation](https://github.com/zkopru-network/private-exchange/blob/main/docs/localenv.md). Start zkopru coordinator in docker container.
2. Add zkopru dev network to metamask by following [this article](https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC)

## Build and load extension

### Clone this repository and install dependencies

```bash
$ git clone https://github.com/zkopru-network/zkopru-extension.git
$ cd zkopru-extension
$ npm i
# or
$ yarn
```

### Build Extension

```bash
$ npm run build -- --target firefox
```

### Load the build directory in firefox browser

There are two ways to load built extension in firefox.

1. Load extension manually
2. Load extension using web-ext

We recommend using web-ext because it's easier to build and debug. But in order to use that, you first need to setup firefox profile and install Metamask to the profile you will use in web-ext build.
Follow [this docs](https://support.mozilla.org/en-US/kb/profile-manager-create-remove-switch-firefox-profiles) to create new profile for development and copy the profile location.

Set the profile location to $PROFILE_LOCATION and run web-ext to load extension directory. This will automatically launch firefox browser with specified profile.

```bash
$ WEB_EXT_FIREFOX_PROFILE=$PROFILE_LOCATION npm run web-ext:firefox
```

**Note: before loading the extension, you need to install metamask addon to newly added firefox profile. To do that, open firefox with the profile and install Metamask.**

To load extension manually, follow [this guide](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension).

## Run onboarding site

There is an onboarding site for users to onboard the extension wallet for the first launch of the wallet. The site let users to generate zkopru wallet by signing wallet generation message with metamask. Onboarding site also provide a UI to deposit L1 funds into zkopru.

Clone onboarding site and run onboarding site on port 3000.

```bash
$ git clone https://github.com/zkopru-network/zkopru-extension-onboarding-site.git
$ yarn
$ yarn dev
```

If you change the port of onboarding site, you need to change the value of `ONBOARDING_URL` in `src/share/constants.ts#1` and build entire extension project again.

## Open onboarding site to setup browser

Onboarding site is automatically opened if you use web-ext build.
If you're not using web-ext build, open the site running on http://localhost:3000 or just click wallet extension icon installed on firefox toolbar.
