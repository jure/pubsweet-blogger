# PubSweet Blogger Test app

This is a simple super WIP version of a real-time collaborative blogging application built using (PubSweet)[http://pubsweet.coko.foundation/] and Atlaskit's Editor.

_Warning!_ This codebase is such a (fun) MESS, that it at one point featured JS, TypeScript and Flow all at once. Now it just has a combo of JS and broken TypeScript. Due to Atlaskit being on styled-components v3, a lot of webpack magic had to be done to do module replacements and aliasing with styled-components v4 variants. It only works in the development mode. It's also absolutely massive when compiled, amounts to about 14 MB (there's all sorts of stuff being pulled into via Atlaskit, like a PDF renderer etc., there's lots of room for improvement there). There are also NO TESTS! _Warning!_

## Quickstart

```bash
yarn
yarn start:services # this starts a PostgreSQL db via docker-compose
yarn server # starts the Express.js server and webpack development server
```

Navigate to (http://localhost:3000/dashboard)[http://localhost:3000/dashboard] and log in with `admin/password` to get started. Let me know if it breaks.
