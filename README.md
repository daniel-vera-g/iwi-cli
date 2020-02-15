# IWI-CLI

```
  _______          _______       _____ _      _____ 
 |_   _\ \        / /_   _|     / ____| |    |_   _|
   | |  \ \  /\  / /  | |______| |    | |      | |  
   | |   \ \/  \/ /   | |______| |    | |      | |  
  _| |_   \  /\  /   _| |_     | |____| |____ _| |_ 
 |_____|   \/  \/   |_____|     \_____|______|_____|
```

> A simple cli application to query information from the HSKA IWI-API

## Installation

> Currently this app is WIP and not available in the package managers. Please install it localy for testing.

1. `git clone git@github.com:daniel-vera-g/iwi-cli.git`
2. `cd iwi-cli && npm i`
3. `npm i -g .`

## Usage

> Run iwi-cli -h

```
Commands:
  mensa [--veg]  Get the Mensa Menu of the day.

Options:
  --version   Show version number                                      [boolean]
  -h, --help  Show help                                                [boolean]

Examples:
  iwi-cli mensa        Get the mensa plan for the current day
  iwi-cli mensa --veg  Get the mensa plan only including vegetarian dishes

for more information, check out the official IWI web-app at
https://iwi-i-info.firebaseapp.com/

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.