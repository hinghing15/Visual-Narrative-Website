# Visual-Narrative-Website

## Documentation

Quick documentation all the functions and how to use them. I think every one is used in `sample_room.html`.



<u>__DEPRECATED__</u> 

#### ~~`void add_clicker_link(x, y, width, height, href)`~~

~~Creates a clickable area that is a link to a different webpage (room).~~

~~Its position is determined by `x` and `y`, and its size by `width` and `height`.~~

~~It is positioned relative to the top-left corner of the room image.~~

~~The `href` is the url of the webpage, something like `shablammy.html`, or `room2.html`, or even a real url like `http://johncena.gov`, though I don't know how we'd use that.~~



#### ~~`void add_clicker_js(x, y, width, height, js)`~~

~~Creates a clickable area that executes some javascript.~~

~~Its position is determined by `x` and `y`, and its size by `width` and `height`.~~

~~It is positioned relative to the top-left corner of the room image.~~

~~The `js` is the script you want to run. It can do pretty much anything, but in the example room I have it check if you have the key in your inventory before you can open the door.~~



#### `void add_clicker(x, y, width, height, id, picture_src, js)`

The new clicker adding method. create a clicker at `x`, `y`, with size `width`, `height`.

It has an id (used for coding and logic), a background picture (optional!), and a function that executes on click.

#### `void remove_clicker(id)`

Removes the clicker that has the specified id. cannot be used to remove non-clicker elements (a bit of a no-brainer, but worth remembering)



#### `bool inventory_has_item(name)`

Returns true if there's an item with the name `name` in the inventory, false if not.



#### `void inventory_add_item(name, img_src)`

Add an item to the inventory, with a String `name` and a String `img_src`. the image should be 50x50 pixels, and formatted like this example: `items/key.png`. It won't add the item if you already have one with the same name.



#### `void inventory_remove_item(name)`

Remove the first item with the name `name` from the inventory.



#### `void inventory_clear()`

Remove  everything from the inventory.



#### `void subtitle_set(message)`

Sets the subtitle beneath the inventory bar to the String `message`. Does not persist between rooms like the inventory. Use it for stuff like telling the player if a door is locked.



#### `void picture_set(url)`

Sets the background picture to `url`. Used at the creation of the room, but can be used for other cool stuff, if needed.



#### `void nav_left(link)`/ `nav_right(link)`/ `nav_up(link)`/  `nav_down(link)`

These functions set what room the left/right/top/bottom clickable areas send the player to.



#### `new Sound(src)` 

Create a Sound object. with the source `src`.

##### `void Sound.play()`

Play the sound, once.

##### `void Sound.playLooping()`

Play the sound on repeat.

##### `void Sound.pause()`

Stop the sound.



#### `void show_inline_view(picture_src, on_load)`

show an inline view with the specified picture as the background.

executes the `on_load` function every time it loads. use this to create the inline clickers for it with `add_inline_clicker()`



#### `void hide_inline_view()`

hides the current inline view. clears all inline clickers.



#### `void add_inline_clicker(x, y, width, height, id, picture_src, js)`

same functionality as `add_clicker()`, but for the inline view. use this in the on_load function for show_inline_view.



### `void remove_inline_clicker(id)`

same functionality as `remove_clicker()` but for the inline view. note: `hide_inline_view()` removes every inline clicker automatically.

---

## Debug

I have a debug variable set up right now. It prints the inventory in the top left corner, and outlines all the clickers in transparent yellow. If you want to turn it off, go into `script.js` and change

```javascript
var debug = true;
```

to

```javascript
var debug = false;
```

but be really careful about committing that tiny change to the github 'cause it could be really confusing idk



## Todo

