# HL7 Generator

## Development setup

To run it locally, run `npm install` to install any required packages.

### Rust Cargo and Tauri

If you wish to deploy it as an application, you must install [Rust Cargo](https://win.rustup.rs/x86_64) and [Tauri](https://tauri.studio/en/docs/usage/development/integration#alternatively-install-tauri-cli-as-a-cargo-subcommand).

## Development server

Run `npm start` for a dev server. Navigate to [localhost:4200](http://localhost:4200/). The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `public/` directory. Use the `--prod` flag for a production build.

## Creating .exe file

> Ensure you have installed [Rust Cargo and Tauri](#rust-cargo-and-tauri) before continuing.

After having generated the build artifacts in the `public/` folder, run `cargo tauri build` to create an `.exe` file in the `src-tauri/target/release/` folder and an installer in the `bundle/` folder within the previous.
