# IWI-CLI

> Maybe working on this in the future...see `Note` below

```
  _______          _______       _____ _      _____ 
 |_   _\ \        / /_   _|     / ____| |    |_   _|
   | |  \ \  /\  / /  | |______| |    | |      | |  
   | |   \ \/  \/ /   | |______| |    | |      | |  
  _| |_   \  /\  /   _| |_     | |____| |____ _| |_ 
 |_____|   \/  \/   |_____|     \_____|______|_____|
```

> A simple cli application to query information from the HSKA IWI-API

## Note

> If you don't care about presentation, you can just use a one-liner with `curl` and `jq`:

```bash
# Get the name of the current "Wahlessen 1"
curl -s -X GET "https://www.iwi.hs-karlsruhe.de/iwii/REST/canteen/v2/2/$(date +%F)" -H  "accept: application/json" | jq '.mealGroups[] | select(.title=="Wahlessen 1") | .meals[0].name'

# Get the name and prices for the current meals
curl -s -X GET "https://www.iwi.hs-karlsruhe.de/iwii/REST/canteen/v2/2/$(date +%F)" -H  "accept: application/json" | jq '.mealGroups[] | [.title, .meals[].name, .meals[].priceStudent]'
```

- [  ] Due to the cli performance of nodejs and the overhead of npm, the codebase will probably migrate to bash, golang or rust.

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
