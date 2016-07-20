#hubot-dreadnought

## Installation

* Add hubot-dreadnought to your `package.json` file.
* Add hubot-dreadnought to your `external-scripts.json` file.
* Add a dreadnought.json configuration file to give commands to add

## Configuration

You will need a dreadnought.json.  Here is an example:

```json
{
  "remap_fields": {
    "servers": [{"finder": "beanstalk", "params": {"selector": "first", "environment": "rope-prod"}}],
    "params": [
      "BOARD_ID": "int"
    ]
  }
}
```

Now with this json configured, you can do the following command:

```
hubot remap_fields <BOARD_ID>
```

It should validate that it has a single arg, BOARD_ID, and that it is an int
