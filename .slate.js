// // # Config's directive: config name value

// // # Default to the current screen if the screen the reference does not exist.
// // config defaultToCurrentScreen true
// // # The base value for nudge percent calculation
// // config nudgePercentOf screenSize
// // # The base value for resize percent calculation
// // config resizePercentOf screenSize


// // # Layout's directive - layout name 'app name':OPTIONS operations

// // # Creates the aliases needed for this example
// // alias 0-full move screenOriginX;screenOriginY screenSizeX;screenSizeY 0
// // alias 1-full move screenOriginX;screenOriginY screenSizeX;screenSizeY 1

// // # oneDisplayLayout - Places iTerm in the left half and Firefox in the right half.
// // layout oneDisplayLayout 'iTerm':MAIN_FIRST #{lefthalf}
// // layout oneDisplayLayout 'Firefox':REPEAT #{righthalf}
// // # twoDisplayLayout - Places iTerm in full screen in the first display and Firefox in full screen in the second display
// // layout twoDisplayLayout 'iTerm':MAIN_FIRST #{0-full}
// // layout twoDisplayLayout 'Firefox':REPEAT #{1-full}


// # Resize - Resizes the window in the specified direction
// bind l:alt resize +1% +0

// # Nudge - Nudges the window in the specified direction
// bind l:shift;alt nudge +1% +0

// # Focus - Brings the focus to the window in the specified position
// bind l:shift;ctrl focus right
//- See more at: http://mauriciogardini.com/post/43348489262/slate-a-mac-os-x-window-manager-for-power-users#sthash.OpDJlpf3.dpuf



S.log("[SLATE] -------------- Started Loading Config --------------");

// Configs
S.cfga({
  "defaultToCurrentScreen" : true,
  "secondsBetweenRepeat" : 0.1,
  "checkDefaultsOnLoad" : true,
  "focusCheckWidthMax" : 3000,
  "orderScreensLeftToRight" : true
});

// Monitors
// Future use?
var monLaptop1 = "1680x1050";
var monLaptop2 = "1440x900";
var monTbolt = "2560x1440";

// Set up screen reference variables to avoid typos :)
var mainScreen = "0";
var bigScreen = "1";

var mainScreenFull = S.op("move", {
  "screen" : mainScreen,
  "x" : "screenOriginX",
  "y" : "screenOriginY",
  "width" : "screenSizeX",
  "height" : "screenSizeY"
});
var mainScreenTop = mainScreenFull.dup({ "height" : "screenSizeY/2" });
var mainScreenTopLeft = mainScreenTop.dup({ "width" : "screenSizeX/2" });
var mainScreenTopRight = mainScreenTopLeft.dup({ "x" : "screenOriginX+screenSizeX/2" });
var mainScreenBottom = mainScreenTop.dup({ "y" : "screenOriginY+screenSizeY/2" });
var mainScreenBottomLeft = mainScreenBottom.dup({ "width" : "screenSizeX/3" });
var mainScreenBottomMid = mainScreenBottomLeft.dup({ "x" : "screenOriginX+screenSizeX/3" });
var mainScreenBottomRight = mainScreenBottomLeft.dup({ "x" : "screenOriginX+2*screenSizeX/3" });
var mainScreenLeft = mainScreenTopLeft.dup({ "height" : "screenSizeY" });
var mainScreenRight = mainScreenTopRight.dup({ "height" : "screenSizeY" });

// Batch bind everything. Less typing.
S.bnda({
  // Basic Location Bindings
  "return:shift;alt;cmd" : mainScreenFull,
  "j:shift;cmd" : mainScreenLeft,
  "l:shift;cmd" : mainScreenRight,
  "i:shift;cmd" : mainScreenTop,
  ",:shift;cmd" : mainScreenBottom,
  "u:shift;cmd" : mainScreenTopLeft,
  "o:shift;cmd" : mainScreenTopRight,
  "m:shift;cmd" : mainScreenBottomLeft,
  ".:shift;cmd" : mainScreenBottomRight,

  // Resize Bindings
  // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  // "right:ctrl" : S.op("resize", { "width" : "+10%", "height" : "+0" }),
  // "left:ctrl" : S.op("resize", { "width" : "-10%", "height" : "+0" }),
  // "up:ctrl" : S.op("resize", { "width" : "+0", "height" : "-10%" }),
  // "down:ctrl" : S.op("resize", { "width" : "+0", "height" : "+10%" }),
  // "right:alt" : S.op("resize", { "width" : "-10%", "height" : "+0", "anchor" : "bottom-right" }),
  // "left:alt" : S.op("resize", { "width" : "+10%", "height" : "+0", "anchor" : "bottom-right" }),
  // "up:alt" : S.op("resize", { "width" : "+0", "height" : "+10%", "anchor" : "bottom-right" }),
  // "down:alt" : S.op("resize", { "width" : "+0", "height" : "-10%", "anchor" : "bottom-right" }),

  // Push Bindings
  // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  // "right:ctrl;shift" : S.op("push", { "direction" : "right", "style" : "bar-resize:screenSizeX/3" }),
  // "left:ctrl;shift" : S.op("push", { "direction" : "left", "style" : "bar-resize:screenSizeX/3" }),
  // "up:ctrl;shift" : S.op("push", { "direction" : "up", "style" : "bar-resize:screenSizeY/2" }),
  // "down:ctrl;shift" : S.op("push", { "direction" : "down", "style" : "bar-resize:screenSizeY/2" }),

  // Nudge Bindings
  // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  // "right:ctrl;alt" : S.op("nudge", { "x" : "+10%", "y" : "+0" }),
  // "left:ctrl;alt" : S.op("nudge", { "x" : "-10%", "y" : "+0" }),
  // "up:ctrl;alt" : S.op("nudge", { "x" : "+0", "y" : "-10%" }),
  // "down:ctrl;alt" : S.op("nudge", { "x" : "+0", "y" : "+10%" }),

  // Throw Bindings
  // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  // "pad1:ctrl;alt" : S.op("throw", { "screen" : "2", "width" : "screenSizeX", "height" : "screenSizeY" }),
  // "pad2:ctrl;alt" : S.op("throw", { "screen" : "1", "width" : "screenSizeX", "height" : "screenSizeY" }),
  // "pad3:ctrl;alt" : S.op("throw", { "screen" : "0", "width" : "screenSizeX", "height" : "screenSizeY" }),
  // "right:ctrl;alt;cmd" : S.op("throw", { "screen" : "right", "width" : "screenSizeX", "height" : "screenSizeY" }),
  // "left:ctrl;alt;cmd" : S.op("throw", { "screen" : "left", "width" : "screenSizeX", "height" : "screenSizeY" }),
  // "up:ctrl;alt;cmd" : S.op("throw", { "screen" : "up", "width" : "screenSizeX", "height" : "screenSizeY" }),
  // "down:ctrl;alt;cmd" : S.op("throw", { "screen" : "down", "width" : "screenSizeX", "height" : "screenSizeY" }),

  // Focus Bindings
  // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  // "right:cmd" : S.op("focus", { "direction" : "right" }),
  // "left:cmd" : S.op("focus", { "direction" : "left" }),
  // "up:cmd" : S.op("focus", { "direction" : "up" }),
  // "down:cmd" : S.op("focus", { "direction" : "down" }),
  // "up:cmd;alt" : S.op("focus", { "direction" : "behind" }),
  // "down:cmd;alt" : S.op("focus", { "direction" : "behind" }),

  // Window Hints
  "esc:cmd" : S.op("hint"),

  // Switch currently doesn't work well so I'm commenting it out until I fix it.
  //"tab:cmd" : S.op("switch"),

  // Grid
  "esc:ctrl" : S.op("grid")
});

// // Test Cases
// // S.src(".slate.test", true);
// // S.src(".slate.test.js", true);

// // Log that we're done configuring
S.log("[SLATE] -------------- Finished Loading Config --------------");