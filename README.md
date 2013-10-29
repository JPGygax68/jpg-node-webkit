jpg-node-webkit
===============

A grunt-init template for node-webkit projects.

[node-webkit](https://github.com/rogerwang/node-webkit) opens whole new ways of coding by combining the webkit browser engine with the Node javascript runner into a single runtime environment.

This is a seriously powerful combination, which however can be a bit on the tricky side to get going. So, I wrote this [grunt-init](https://github.com/gruntjs/grunt-init) template to help me take the frustration out of starting new projects. 
For the time being, this template is rather simple, but it already incorporates a few bits of hard-earned wisdom.

Here's the rundown:

- Grunt as the build system

- Jade instead of HTML (compiled to HTML by the Gruntfile)

- Stylus instead of CSS (compiled to CSS by the Gruntfile)

- Both NPM and Bower are used as package managers

- Browserify as the package loader

- Clean separation between Node and Webkit code


Getting started
---------------

First, download and install [node-webkit](https://github.com/rogerwang/node-webkit).

Then, download or clone `jpg-node-webkit` under `~/.grunt-init/`.

Create a directory for your new project, go there with your command shell, and do:

```
grunt-init jpg-node-webkit
```

and answer the questions (there are no hard ones for now). Then, run

```
npm install
```

(which should install all required packages) and follow up with

```
grunt
```

If that executes without errors, your skeleton app is ready to run, which you can do by typing:

```
nw build
```

That's it. Your `package.json` file resides at the top level of your project directory, `src` contains all of its code, while `build` is where the Grunt default target is going to create the runnable node-webkit bundle.

`src` is divided into three subdirectories: `node`, `client` (and `data`, but that's not being used right now). The key idea behind that is to help avoid the frustrating mishaps that can arise when coding for both the Node and the window contexts of node-webkit.

Without going into details (which in fact are still a bit hazy to me): JavaScript code in `node/node-init.js` or any of its dependencies executes in the Node context, while JS code in `client/main.js` or its dependencies runs in a "window" context.


Just ask
--------

This was unreasonably short, but that's because this template is just getting started. If you have trouble with it, let me know!
