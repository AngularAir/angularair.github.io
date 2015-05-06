# Contributing

## Updating episodes

### High level info

- Episode configuration is stored in the `script.js` file. Most of the data for each episode lives there
- Episode resources (profile pictures/description/etc.) live in the `episodes` folder in a folder that's named after the date of the episode
- Profile pictures are named after the person's twitter handle (unless it starts with a `_`, in which case, omit that and specify the avatar explicitly)
- Episode descriptions are stored in a `description.md` file
- If there is a sponsor for the episode, their blurb goes in a `sponsorship.md` file and their profile picture follows the same convention as a person's picture.

### Steps

1. Add episode configuration to the `episodes` array (copy/paste from another episode)
2. Add pictures for users/sponsors
  - [Should be `png`](http://image.online-convert.com/convert-to-png)
  - Resize to 180x180 px
  - Shrink file with [TinyPNG](https://tinypng.com/)
3. Create `description.md` (and if necessary, `sponsorship.md`).
4. Move old episode configs to `pastEpisodes` array (make sure it's in order).
5. `git add -A && git commit -am 'Adding {episode_name}' && git push`
6. Wait for 10 seconds, then go to [the website](http://angular-air.com) and check everything worked ok.

Thanks!

