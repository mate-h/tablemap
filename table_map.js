/* global DEBUG, CanvasElements, CanvasElementManager, Colors, Gravity, Mouse, this, CheckboxState, PanelType, AllowedChars, ButtonShape, NO_ANIMATION */

//ICONS
//trash can    59506
//select all   57698
//rotate right 58394
//X            57676
//+            57669
//horiz        59604
//vert         59605
//?            59527
//i            59534
//floppy	   57697

//GLOBAL
var DEBUG = false;
var NO_CACHE = false;
var LAYOUT_BOUNDS = false;
var NO_ANIMATION = false;
var Colors = {
  red_50: "#FFEBEE",
  red_100: "#FFCDD2",
  red_200: "#EF9A9A",
  red_300: "#E57373",
  red_400: "#EF5350",
  red_500: "#F44336",
  red_600: "#E53935",
  red_700: "#D32F2F",
  red_800: "#C62828",
  red_900: "#B71C1C",
  red_A100: "#FF8A80",
  red_A200: "#FF5252",
  red_A400: "#FF1744",
  red_A700: "#D50000",
  pink_50: "#FCE4EC",
  pink_100: "#F8BBD0",
  pink_200: "#F48FB1",
  pink_300: "#F06292",
  pink_400: "#EC407A",
  pink_500: "#E91E63",
  pink_600: "#D81B60",
  pink_700: "#C2185B",
  pink_800: "#AD1457",
  pink_900: "#880E4F",
  pink_A100: "#FF80AB",
  pink_A200: "#FF4081",
  pink_A400: "#F50057",
  pink_A700: "#C51162",
  purple_50: "#F3E5F5",
  purple_100: "#E1BEE7",
  purple_200: "#CE93D8",
  purple_300: "#BA68C8",
  purple_400: "#AB47BC",
  purple_500: "#9C27B0",
  purple_600: "#8E24AA",
  purple_700: "#7B1FA2",
  purple_800: "#6A1B9A",
  purple_900: "#4A148C",
  purple_A100: "#EA80FC",
  purple_A200: "#E040FB",
  purple_A400: "#D500F9",
  purple_A700: "#AA00FF",
  deep_purple_50: "#EDE7F6",
  deep_purple_100: "#D1C4E9",
  deep_purple_200: "#B39DDB",
  deep_purple_300: "#9575CD",
  deep_purple_400: "#7E57C2",
  deep_purple_500: "#673AB7",
  deep_purple_600: "#5E35B1",
  deep_purple_700: "#512DA8",
  deep_purple_800: "#4527A0",
  deep_purple_900: "#311B92",
  deep_purple_A100: "#B388FF",
  deep_purple_A200: "#7C4DFF",
  deep_purple_A400: "#651FFF",
  deep_purple_A700: "#6200EA",
  indigo_50: "#E8EAF6",
  indigo_100: "#C5CAE9",
  indigo_200: "#9FA8DA",
  indigo_300: "#7986CB",
  indigo_400: "#5C6BC0",
  indigo_500: "#3F51B5",
  indigo_600: "#3949AB",
  indigo_700: "#303F9F",
  indigo_800: "#283593",
  indigo_900: "#1A237E",
  indigo_A100: "#8C9EFF",
  indigo_A200: "#536DFE",
  indigo_A400: "#3D5AFE",
  indigo_A700: "#304FFE",
  blue_50: "#E3F2FD",
  blue_100: "#BBDEFB",
  blue_200: "#90CAF9",
  blue_300: "#64B5F6",
  blue_400: "#42A5F5",
  blue_500: "#2196F3",
  blue_600: "#1E88E5",
  blue_700: "#1976D2",
  blue_800: "#1565C0",
  blue_900: "#0D47A1",
  blue_A100: "#82B1FF",
  blue_A200: "#448AFF",
  blue_A400: "#2979FF",
  blue_A700: "#2962FF",
  light_blue_50: "#E1F5FE",
  light_blue_100: "#B3E5FC",
  light_blue_200: "#81D4FA",
  light_blue_300: "#4FC3F7",
  light_blue_400: "#29B6F6",
  light_blue_500: "#03A9F4",
  light_blue_600: "#039BE5",
  light_blue_700: "#0288D1",
  light_blue_800: "#0277BD",
  light_blue_900: "#01579B",
  light_blue_A100: "#80D8FF",
  light_blue_A200: "#40C4FF",
  light_blue_A400: "#00B0FF",
  light_blue_A700: "#0091EA",
  cyan_50: "#E0F7FA",
  cyan_100: "#B2EBF2",
  cyan_200: "#80DEEA",
  cyan_300: "#4DD0E1",
  cyan_400: "#26C6DA",
  cyan_500: "#00BCD4",
  cyan_600: "#00ACC1",
  cyan_700: "#0097A7",
  cyan_800: "#00838F",
  cyan_900: "#006064",
  cyan_A100: "#84FFFF",
  cyan_A200: "#18FFFF",
  cyan_A400: "#00E5FF",
  cyan_A700: "#00B8D4",
  teal_50: "#E0F2F1",
  teal_100: "#B2DFDB",
  teal_200: "#80CBC4",
  teal_300: "#4DB6AC",
  teal_400: "#26A69A",
  teal_500: "#009688",
  teal_600: "#00897B",
  teal_700: "#00796B",
  teal_800: "#00695C",
  teal_900: "#004D40",
  teal_A100: "#A7FFEB",
  teal_A200: "#64FFDA",
  teal_A400: "#1DE9B6",
  teal_A700: "#00BFA5",
  green_50: "#E8F5E9",
  green_100: "#C8E6C9",
  green_200: "#A5D6A7",
  green_300: "#81C784",
  green_400: "#66BB6A",
  green_500: "#4CAF50",
  green_600: "#43A047",
  green_700: "#388E3C",
  green_800: "#2E7D32",
  green_900: "#1B5E20",
  green_A100: "#B9F6CA",
  green_A200: "#69F0AE",
  green_A400: "#00E676",
  green_A700: "#00C853",
  light_green_50: "#F1F8E9",
  light_green_100: "#DCEDC8",
  light_green_200: "#C5E1A5",
  light_green_300: "#AED581",
  light_green_400: "#9CCC65",
  light_green_500: "#8BC34A",
  light_green_600: "#7CB342",
  light_green_700: "#689F38",
  light_green_800: "#558B2F",
  light_green_900: "#33691E",
  light_green_A100: "#CCFF90",
  light_green_A200: "#B2FF59",
  light_green_A400: "#76FF03",
  light_green_A700: "#64DD17",
  lime_50: "#F9FBE7",
  lime_100: "#F0F4C3",
  lime_200: "#E6EE9C",
  lime_300: "#DCE775",
  lime_400: "#D4E157",
  lime_500: "#CDDC39",
  lime_600: "#C0CA33",
  lime_700: "#AFB42B",
  lime_800: "#9E9D24",
  lime_900: "#827717",
  lime_A100: "#F4FF81",
  lime_A200: "#EEFF41",
  lime_A400: "#C6FF00",
  lime_A700: "#AEEA00",
  yellow_50: "#FFFDE7",
  yellow_100: "#FFF9C4",
  yellow_200: "#FFF59D",
  yellow_300: "#FFF176",
  yellow_400: "#FFEE58",
  yellow_500: "#FFEB3B",
  yellow_600: "#FDD835",
  yellow_700: "#FBC02D",
  yellow_800: "#F9A825",
  yellow_900: "#F57F17",
  yellow_A100: "#FFFF8D",
  yellow_A200: "#FFFF00",
  yellow_A400: "#FFEA00",
  yellow_A700: "#FFD600",
  amber_50: "#FFF8E1",
  amber_100: "#FFECB3",
  amber_200: "#FFE082",
  amber_300: "#FFD54F",
  amber_400: "#FFCA28",
  amber_500: "#FFC107",
  amber_600: "#FFB300",
  amber_700: "#FFA000",
  amber_800: "#FF8F00",
  amber_900: "#FF6F00",
  amber_A100: "#FFE57F",
  amber_A200: "#FFD740",
  amber_A400: "#FFC400",
  amber_A700: "#FFAB00",
  orange_50: "#FFF3E0",
  orange_100: "#FFE0B2",
  orange_200: "#FFCC80",
  orange_300: "#FFB74D",
  orange_400: "#FFA726",
  orange_500: "#FF9800",
  orange_600: "#FB8C00",
  orange_700: "#F57C00",
  orange_800: "#EF6C00",
  orange_900: "#E65100",
  orange_A100: "#FFD180",
  orange_A200: "#FFAB40",
  orange_A400: "#FF9100",
  orange_A700: "#FF6D00",
  deep_orange_50: "#FBE9E7",
  deep_orange_100: "#FFCCBC",
  deep_orange_200: "#FFAB91",
  deep_orange_300: "#FF8A65",
  deep_orange_400: "#FF7043",
  deep_orange_500: "#FF5722",
  deep_orange_600: "#F4511E",
  deep_orange_700: "#E64A19",
  deep_orange_800: "#D84315",
  deep_orange_900: "#BF360C",
  deep_orange_A100: "#FF9E80",
  deep_orange_A200: "#FF6E40",
  deep_orange_A400: "#FF3D00",
  deep_orange_A700: "#DD2C00",
  brown_50: "#EFEBE9",
  brown_100: "#D7CCC8",
  brown_200: "#BCAAA4",
  brown_300: "#A1887F",
  brown_400: "#8D6E63",
  brown_500: "#795548",
  brown_600: "#6D4C41",
  brown_700: "#5D4037",
  brown_800: "#4E342E",
  brown_900: "#3E2723",
  bluegrey_50: "#ECEFF1",
  bluegrey_100: "#CFD8DC",
  bluegrey_200: "#B0BEC5",
  bluegrey_300: "#90A4AE",
  bluegrey_400: "#78909C",
  bluegrey_500: "#607d8b",
  bluegrey_600: "#546E7A",
  bluegrey_700: "#455A64",
  bluegrey_800: "#37474F",
  bluegrey_900: "#263238",
  grey_50: "#fafafa",
  grey_100: "#f5f5f5",
  grey_200: "#eeeeee",
  grey_300: "#E0E0E0",
  grey_400: "#BDBDBD",
  grey_500: "#9E9E9E",
  grey_600: "#757575",
  grey_700: "#616161",
  grey_800: "#424242",
  grey_900: "#212121",
  black: "#000000",
  white: "#ffffff"
};
var home_lang = "en-US";
var gapi;
var HTMLDialog = {};
var Util = {};
var TableMapClientVersion = "v0.5.8.0";
var debug = [];
var map_canvas_id;
var map_unit = 40; //px
var debugJSON = {};

/*
 * Client class used to manage the table map on TableTapp server associated with the current session.
 *
 * @returns {TableMapClient}
 *
 * Dependencies
 * [tabletapp.js] showDialog()
 * [canvas_elements.js] CanvasElementManager
 */
var TableMapClient = function() {
  //TableMap settings
  TableMapClient.settings = {
    /*The language of the application
     * Available locales: "en_US" | "hu_HU"
     */
    lang: home_lang,
    /*The format of the time displayed globally.
     * Options: true | false
     */
    time_format_12_hr: home_lang === "hu-HU" ? false : true
  };

  //set global field
  lang = TableMapClient.settings.lang;

  //Private fields
  //debug
  var draw_cnt = 0;

  //graphics
  var canvas;
  var ctx;
  //input
  var mouse = { x: 0, y: 0 };
  //misc
  var paint_needed = false;
  var mainFPStimer;
  var context_menu = null;

  //CONSTANTS
  var refreshFPS = 60;
  var color_background = Colors.grey_50; //"#eeeded";
  var color_toolbar = Colors.bluegrey_500;
  var dimen_context_item_height = 24;
  var dimen_context_item_width = 188;
  var dimen_context_item_padding = 10;
  var dimen_context_item_text_padding = 48;
  var dimen_context_item_padding_arrow_right = 10;
  var dimen_context_menu_top_bottom_padding = 6;
  var dimen_context_separator_height = 12;
  var dimen_context_icon_size = 18;
  var dimen_context_text_size = 12;
  var dimen_context_text_secondary_size = 12;
  var dimen_toolbar_height = 40;
  var dimen_toolbar_elevation = 3;
  var icon_arrow_right = String.fromCharCode(58828);
  var time_context_menu_fade = 100;
  var value_shadow_alpha = 0.2;
  var zoom_minimum = 0.2;
  var zoom_maximum = 40;
  var zoom_multiplier = 1 / 250;

  this.initialize = function(canvas_id) {
    map_canvas_id = canvas_id;
    canvas = document.getElementById(canvas_id);
    ctx = canvas.getContext("2d");
    var dppx = window.devicePixelRatio;
    canvas.scaledWidth = canvas.width + 0;
    canvas.scaledHeight = canvas.height + 0;
    if (dppx !== 1) {
      canvas.style.width = canvas.width + "px";
      canvas.style.height = canvas.height + "px";
      canvas.width = canvas.width * dppx;
      canvas.height = canvas.height * dppx;
      ctx.scale(dppx, dppx);
    }

    if (window.$ === undefined) {
      //no jQuery
      var text = "jQuery not found.";
      ctx.font = "12pt Roboto";
      ctx.fillStyle = "#000000";
      ctx.globalAlpha = 0.54;
      var x = canvas.scaledWidth / 2 - ctx.measureText(text).width / 2;
      var y = canvas.scaledHeight / 2 + 12 / 2;
      ctx.fillText(text, x, y);
      ctx.globalAlpha = 1;
      return null;
    }
    document.addEventListener(
      "mousemove",
      function(evt) {
        onMouseMove(evt);
      },
      false
    );
    document.addEventListener(
      "mousedown",
      function(evt) {
        if (evt.button === 0) onLeftMouseDown(evt);
        if (evt.button === 1) onMiddleMouseDown(evt);
        if (evt.button === 2) onRightMouseDown(evt);
      },
      false
    );
    document.addEventListener(
      "mouseup",
      function(evt) {
        if (evt.button === 0) onLeftMouseUp(evt);
        if (evt.button === 1) onMiddleMouseUp(evt);
        if (evt.button === 2) onRightMouseUp(evt);
      },
      false
    );
    document.addEventListener(
      "keydown",
      function(evt) {
        onKeyDown(evt);
      },
      false
    );
    document.addEventListener(
      "keyup",
      function(evt) {
        onKeyUp(evt);
      },
      false
    );
    document.addEventListener(
      "keypress",
      function(evt) {
        onKeyPress(evt);
      },
      false
    );
    document.addEventListener(
      "wheel",
      function(evt) {
        onMouseScroll(evt);
      },
      false
    );
    canvas.onresize = function() {
      paint();
    };

    TableMapClient.canvas = canvas;

    //initialize pages
    PageManager.initialize();

    //initialize context menu
    context_menu = new ContextMenu();
    context_menu.setType(ContextMenuType.NormalMode);

    mainFPStimer = setInterval(function() {
      update();
    }, 1000 / refreshFPS);
    window.setTimeout(paint, 500);

    //disable window stuff
    canvas.oncontextmenu = function(event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    };
    $(window).keydown(function(event) {
      if (
        (event.keyCode === 107 && event.ctrlKey === true) ||
        (event.keyCode === 109 && event.ctrlKey === true)
      ) {
        event.preventDefault();
      }

      $(window).bind("Mousewheel DOMMouseScroll", function(event) {
        if (event.ctrlKey === true) {
          event.preventDefault();
        }
      });
    });
  };
  this.reinitialize = function(canvas_id) {
    map_canvas_id = canvas_id;
    canvas = document.getElementById(canvas_id);
    ctx = canvas.getContext("2d");
    TableMapClient.canvas = canvas;
    for (var i = 0; i < CanvasElementManagerCount; i++) {
      var mgr = CanvasElementManagerReferences[i];
      mgr.assignCanvas(canvas);
      mgr.removeDialog();
    }
    PageManager.current_page = undefined;
    PageManager.downloadMap();
    paint();

    //disable window stuff
    canvas.oncontextmenu = function(event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    };
    $(window).keydown(function(event) {
      if (
        (event.keyCode === 107 && event.ctrlKey === true) ||
        (event.keyCode === 109 && event.ctrlKey === true)
      ) {
        event.preventDefault();
      }

      $(window).bind("Mousewheel DOMMouseScroll", function(event) {
        if (event.ctrlKey === true) {
          event.preventDefault();
        }
      });
    });
  };

  function onMouseMove(evt) {
    mouse.x = evt.clientX - canvas.getBoundingClientRect().left;
    mouse.y = evt.clientY - canvas.getBoundingClientRect().top;
    update();
  }
  function onLeftMouseDown(evt) {
    update();
    context_menu.leftClickDown();
  }
  function onRightMouseDown(evt) {
    update();
  }
  function onMiddleMouseDown(evt) {
    update();
  }
  function onLeftMouseUp(evt) {
    update();
    context_menu.leftClickUp();
  }
  function onRightMouseUp(evt) {
    update();
    context_menu.rightClickUp();
  }
  function onMiddleMouseUp(evt) {
    update();
  }
  function onMouseScroll(evt) {
    update();
  }
  function onKeyDown(evt) {
    update();
  }
  function onKeyUp(evt) {
    update();
  }
  function onKeyPress(evt) {
    update();
  }

  var prev_w = 0,
    prev_h = 0;
  function update() {
    var window_resized =
      prev_w !== canvas.scaledWidth || prev_h !== canvas.scaledHeight;
    paint_needed =
      paint_needed ||
      Util.animating ||
      PageManager.paint_needed() ||
      CanvasElementManager.paint_needed;
    if (paint_needed) {
      paint();
      paint_needed = false;
    }
    prev_w = canvas.scaledWidth + 0;
    prev_h = canvas.scaledHeight + 0;

    context_menu.update();
  }

  function paint() {
    draw_cnt++;
    ctx.clearRect(0, 0, canvas.scaledWidth, canvas.scaledHeight);
    ctx.fillStyle = color_background;
    ctx.fillRect(0, 0, canvas.scaledWidth, canvas.scaledHeight);

    PageManager.paint();
    context_menu.paint();

    //version footer
    if (DEBUG) {
      ctx.fillStyle = Colors.red_400;
      ctx.globalAlpha = 1;
      /*Util.roundedShape(ctx, [
             {x: 190, y: 400},
             {x: 350, y: 120},
             {x: mouse.x, y: mouse.y}
             ], 30, true, false);*/
      //debug
      ctx.font = "10px monospace";
      ctx.fillStyle = "black";
      ctx.fillText(TableMapClientVersion, 10, canvas.scaledHeight - 10);

      ctx.fillText("draw_count: " + draw_cnt, 10, 20);
      if (20 + 14 + debug.length * 14 > canvas.scaledHeight) debug.splice(0, 1);
      for (var i = 0; i < debug.length; i++) {
        ctx.fillText(debug[i], 10, 20 + 14 + i * 14);
      }
      var offsetY = 23;
      var row_gap = -1;
      var offsetX = 300;
      ctx.fillText("TABLEMAP OBJECT:", offsetX + 10, 33);
      ctx.font = "8px monospace";
      var font_size = 8;
      if (EditPage.tablemap !== undefined) {
        var finalMSG = JSON.stringify(EditPage.tablemap, "\n", "    ").split(
          "\n"
        );
        for (var i = 0; i < finalMSG.length; i++) {
          ctx.fillText(
            finalMSG[i],
            offsetX + 10,
            10 + font_size * (i + 1) + row_gap * (i + 1) + offsetY
          );
        }
      } else {
        ctx.fillText("undefined", offsetX + 10, 46);
      }
      offsetX = 600;
      finalMSG = JSON.stringify(debugJSON, "\n", "    ").split("\n");
      for (var i = 0; i < finalMSG.length; i++) {
        ctx.fillText(
          finalMSG[i],
          offsetX + 10,
          10 + font_size * (i + 1) + row_gap * (i + 1) + offsetY
        );
      }
    }
  }
  this.paint = paint;

  //CLASSES
  function Toolbar(items) {
    this.items = items;
    this.x = 0;
    this.y = 0;
    this.w = canvas.scaledWidth;
    this.h = dimen_toolbar_height;
    this.paint = function() {
      ctx.shadowColor = "rgba(0, 0, 0, " + 0.5 + ")";
      ctx.shadowBlur = 10;
      ctx.fillStyle = Colors.bluegrey_400;
      ctx.fillRect(
        this.x,
        this.y - dimen_context_menu_top_bottom_padding,
        this.w,
        this.h + 2 * dimen_context_menu_top_bottom_padding
      );
      ctx.shadowColor = "rgba(0, 0, 0, 0)";
      ctx.shadowBlur = 0;
    };
  }

  //PAGES
  function Page() {
    this.active = false;
    this.toolbar = new CanvasElements.Panel({
      x: 0,
      y: 0,
      w: 0,
      h: dimen_toolbar_height,
      type: PanelType.Card,
      backcolor: color_toolbar,
      corner: 0
    });
    this.paint_needed = function() {
      return false;
    };
  }
  var PageManager = {};
  var NoTableMapPage;
  var MainPage;
  var EditPage;
  var SettingsPage;
  PageManager.initialize = function() {
    PageManager.manager = new CanvasElementManager(TableMapClient.canvas);

    NoTableMapPage = new Page();
    MainPage = new Page();
    EditPage = new Page();
    SettingsPage = new Page();
    ErrorPage = new Page();

    /* No TableMap page initialization */
    NoTableMapPage.initialize = function() {
      NoTableMapPage.initialized = true;
      NoTableMapPage.manager = new CanvasElementManager(canvas);

      var H = 120 + 64 + 20 + 16;
      var pos = 0.2;
      var panel = new CanvasElements.Panel({
        x: 0,
        y: 0,
        w: 300,
        h: H,
        type: PanelType.Card,
        backcolor: "#FFF"
      });
      var ic = String.fromCharCode(59548);
      panel.add(
        new CanvasElements.Image({
          x: 300 / 2 - 64 / 2,
          y: 16,
          w: 64,
          h: 64,
          icon: ic,
          alpha: 0.54
        })
      );
      panel.add(
        new CanvasElements.Label({
          x: 0,
          y: 64 + 16,
          w: 300,
          h: 125 - 64,
          text: tm_strings[lang]["page_nomap_message"],
          padding: 16
        })
      );
      panel.add(
        new CanvasElements.Button({
          x: 300 - 70 - 16,
          y: H - 30 - 16,
          w: 70,
          h: 30,
          color: Colors.bluegrey_500,
          style: "dark",
          text: tm_strings[lang]["button_add_new"],
          elevated: false,
          onClick: function() {
            var offset = 6;
            var dialog_new_panel = new CanvasElements.Panel({
              x: 0,
              y: 0,
              w: 250,
              h: 30 + 1 * 16 + 1 + offset + 34 + (3 * 12 + 2 * 5),
              type: PanelType.None,
              backcolor: "#FFF",
              no_events: false,
              padding_bottom: 0
            });
            var privacyNote = new CanvasElements.Label({
              x: 0,
              gravity: Gravity.BottomLeft,
              y: 12 + offset + 34 + 36,
              w: 250 - 2 * 16,
              padding: 0,
              text: tm_strings[lang]["dialog_privacy_note"],
              alpha: 0.54
            });
            dialog_new_panel.add(
              new CanvasElements.Dropdown({
                x: 0,
                gravity: Gravity.Right,
                y: 12 + offset,
                w: 110,
                h: 30,
                items: [
                  {
                    text: tm_strings[lang]["public"],
                    icon: String.fromCharCode(59403)
                  },
                  {
                    text: tm_strings[lang]["private"],
                    icon: String.fromCharCode(59543)
                  }
                ],
                onItemSelected: function(i) {
                  if (i === 0)
                    privacyNote.text = tm_strings[lang]["dialog_privacy_note"];
                  if (i === 1)
                    privacyNote.text =
                      tm_strings[lang]["dialog_privacy_private"];
                  privacyNote.calculateText();
                }
              })
            );
            dialog_new_panel.add(
              new CanvasElements.Label({
                x: 0,
                gravity: Gravity.Left,
                y: 12 + 15 - 6 + offset,
                padding: 0,
                text: tm_strings[lang]["set_privacy"],
                alpha: 0.87
              })
            );
            dialog_new_panel.add(privacyNote);
            dialog_new_panel.add(
              new CanvasElements.Input({
                x: 0,
                gravity: Gravity.Right,
                y: 12 + offset + 34,
                w: 110,
                h: 30,
                padding: 0,
                text: "1",
                allowedcharacters: AllowedChars.Numbers,
                minvalue: 1,
                maxvalue: 20
              })
            );
            dialog_new_panel.add(
              new CanvasElements.Label({
                x: 0,
                gravity: Gravity.Left,
                y: 12 + 15 - 6 + offset + 32,
                padding: 0,
                text: tm_strings[lang]["floors"],
                alpha: 0.87
              })
            );
            new CanvasElements.Dialog.Builder(NoTableMapPage.manager)
              .setIcon(String.fromCharCode(59527))
              .setPanel(dialog_new_panel)
              .setMessage(tm_strings[lang]["dialog_create_tablemap"])
              .setPositiveButton(tm_strings[lang]["dialog_ok"])
              .setNegativeButton(tm_strings[lang]["dialog_cancel"])
              .setPositiveAction(function(result) {
                //dropdown
                var privacy = result.elements[0].selecteditem;
                var floors = parseFloat(result.elements[3].text);
                L.i(
                  "privacy: " + privacy + " floors: " + floors,
                  "table_map",
                  334
                );
                EditPage.tablemap = new TableMap();
                EditPage.tablemap.state = TableMapState.Downloaded;
                EditPage.tablemap.privacy =
                  privacy === 0 ? PrivacyLevel.Public : PrivacyLevel.Private;
                for (var i = 0; i < floors; i++) {
                  EditPage.tablemap.floors.push(new TableMap.Floor());
                }
                L.i("TableMap created.", "table_map", 336);
                PageManager.navigate(Pages.Edit);
                EditPage.upload = true;
              })
              .show();
          }
        })
      );
      panel.add(
        new CanvasElements.Button({
          x: 16,
          y: H - 30 - 16,
          w: 110,
          h: 30,
          text: tm_strings[lang]["button_learn_more"],
          elevated: false,
          onClick: function() {
            //TODO navigate to help and info about tablemap (open in new tab)
          }
        })
      );
      NoTableMapPage.manager.add(panel);
      NoTableMapPage.manager.add(this.toolbar);
      NoTableMapPage.manager.disable();

      NoTableMapPage.deactivate = function() {
        NoTableMapPage.manager.disable();
        NoTableMapPage.active = false;
      };
      NoTableMapPage.activate = function() {
        NoTableMapPage.manager.enable();
        NoTableMapPage.active = true;
      };
      NoTableMapPage.paint_needed = function() {
        return NoTableMapPage.manager.paint_needed && NoTableMapPage.active;
      };
      NoTableMapPage.paint = function() {
        panel.x = canvas.scaledWidth / 2 - 150;
        var tolerance = 2 * (canvas.scaledHeight * pos) + panel.h;
        panel.y =
          canvas.scaledHeight < tolerance
            ? canvas.scaledHeight / 2 - panel.h / 2
            : canvas.scaledHeight * pos;
        NoTableMapPage.manager.paint();
      };
    };

    /* Main page initialization */
    MainPage.initialize = function() {
      //settings
      var zoomClip = {
        min: 1000 * 60 * 60 * 1, //1 hour
        max: 1000 * 60 * 60 * 24 * 7 //7 days
      };
      MainPage.initialized = true;
      MainPage.paintneeded = false;
      MainPage.tablemap = new TableMap();
      var manager = new CanvasElementManager(canvas);
      MainPage.toolbar = new CanvasElements.Panel({
        x: 0,
        y: 0,
        w: 0,
        h: dimen_toolbar_height,
        type: PanelType.Card,
        backcolor: color_toolbar,
        corner: 0
      });
      var timeline = new CanvasElements.Panel({
        x: canvas.scaledWidth / 2 - 100,
        y: -10,
        w: 200,
        h: 10 + 10 + 24 + 3 + 18 + 10 + 10,
        padding: 0,
        padding_top: 10,
        padding_right: 0,
        padding_left: 0,
        type: PanelType.Card,
        backcolor: "#FFF"
      });
      var date_label = new CanvasElements.Label({
        x: 0,
        y: 10 + 2,
        w: 0,
        padding: 0,
        text: "",
        font: "12px Roboto",
        gravity: Gravity.CenterHorizontal,
        line_break: false
      });
      date_label.setText = function(date1) {
        var options = {
          month: "2-digit",
          day: "2-digit"
        };
        this.text = date1.toLocaleDateString(lang, options);
        ctx.font = this.font;
        var wh = ctx.measureText(this.text).width + 1;
        this.w = wh;
      };
      var clock = new CanvasElements.Label({
        x: 0,
        y: 10 + 12 + 5,
        w: 0,
        padding: 0,
        text: "",
        font: "24px Roboto",
        gravity: Gravity.CenterHorizontal,
        line_break: false
      });
      clock.setText = function(date1) {
        var displaySeconds = false;
        var options = {
          hour: "2-digit",
          minute: "2-digit",
          hour12: TableMapClient.settings.time_format_12_hr
        };
        this.text = date1.toLocaleTimeString(lang, options);
        ctx.font = this.font;
        var wh = ctx.measureText(this.text).width + 1;
        this.w = wh;
      };
      clock.setText(new Date());
      date_label.setText(new Date());
      var line = new CanvasElements.CustomElement({
        x: clock.x + clock.w + 16,
        y: clock.y + 0,
        w: 12,
        h: 12
      });
      var finish = 0;
      var prev_finish = 0;
      var flip = false;
      line.paint = function(a) {
        var r = this.w > this.h ? this.h / 2 : this.w / 2;
        var c = { x: this.x + this.w / 2, y: this.y + this.h / 2 };
        ctx.beginPath();
        ctx.arc(c.x, c.y, r, 0, 2 * Math.PI, false);
        ctx.lineWidth = 4;
        ctx.globalAlpha = a;
        ctx.strokeStyle = "rgba(0, 0, 0, 0.00)";
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(
          c.x,
          c.y,
          r,
          1.5 * Math.PI,
          ((finish - 90) / 180) * Math.PI,
          flip
        );
        ctx.strokeStyle = "rgba(0, 0, 0, 0.12)";
        ctx.stroke();
        ctx.closePath();
        ctx.globalAlpha = 1;
      };
      var carousel = new CanvasElements.CustomElement({
        x: 0,
        y: 5 + 24 + 3 + 12 + 5,
        w: 150,
        h: 30,
        gravity: Gravity.CenterHorizontal
      });
      var timer = null;
      carousel.onMouseUp = function() {
        for (var i = 0; i < this.boxes.length; i++) {
          var mousex = mouse.x + 0;
          var mousey = mouse.y + 0;
          var x = this.boxes[i].x;
          var y = this.boxes[i].y;
          var w = this.boxes[i].w;
          var h = this.boxes[i].h;
          mousex -= this.parent.x;
          mousey -= this.parent.y;
          if (mousex <= x + w && mousex > x && mousey <= y + h && mousey > y) {
            var c = this.current_time + 0;
            var f = this.boxes[i].time + 0;
            carousel.animating = true;
            timer = Util.animate(
              timer,
              Util.decelerateInterpolator,
              600,
              function(frac) {
                this.current_time = Math.floor(c + frac * (f - c));
                carousel.frac = frac;
                this.manager.requestPaint();
              }.bind(this),
              function() {
                carousel.animating = false;
                carousel.current_time = f;
                carousel.refresh();
                carousel.manager.requestPaint();
              }
            );
            this.boxes[i].pending = false;
          }
        }
      };
      carousel.onMouseDown = function() {
        this.onMouseMove();
      };
      carousel.onMouseMove = function() {
        var buff = [];
        for (var i = 0; i < this.boxes.length; i++) {
          buff[i] = this.boxes[i].active && true;
          var mousex = mouse.x + 0;
          var mousey = mouse.y + 0;
          var x = this.boxes[i].x;
          var y = this.boxes[i].y;
          var w = this.boxes[i].w;
          var h = this.boxes[i].h;
          mousex -= this.parent.x;
          mousey -= this.parent.y;
          if (mousex <= x + w && mousex > x && mousey <= y + h && mousey > y) {
            this.boxes[i].active = true;
            if (Mouse.left_pressed) {
              this.boxes[i].pending = true;
            } else {
              this.boxes[i].pending = false;
            }
          } else {
            this.boxes[i].active = false;
            this.boxes[i].pending = false;
          }
        }
        for (var i = 0; i < buff.length; i++) {
          if (buff[i] !== this.boxes[i].active) {
            //request paint
            this.manager.requestPaint();
          }
        }
      };
      carousel.dots = [];
      carousel.lines = [];
      carousel.refresh = function() {
        clock.setText(new Date(this.current_time));
        date_label.setText(new Date(this.current_time));
        this.time_from = this.current_time - this.zoom / 2;
        this.time_to = this.current_time + this.zoom / 2;

        var dots = [];
        var lines = [];
        var ms = 1;
        var sec = ms * 1000;
        var min = sec * 60;
        var hr = min * 60;
        var day = hr * 24;

        this.unit = min;
        this.unit_small = sec;
        var delta = Math.abs(this.time_to - this.time_from);
        var delta_threshold = 2;
        if (delta < min * delta_threshold) {
          this.unit = sec;
          this.unit_small = ms * 100;
        } else if (delta < hr * delta_threshold) {
          this.unit = min * 10;
          this.unit_small = min;
        } else if (delta < hr * 12) {
          this.unit = hr;
          this.unit_small = min * 10;
        } else if (delta < day * delta_threshold) {
          this.unit = hr * 6;
          this.unit_small = hr;
        } else {
          this.unit = day;
          this.unit_small = day / 4;
        }
        var cursor =
          this.time_from % this.unit === 0
            ? -this.unit
            : this.unit - (this.time_from % this.unit) - this.unit;
        var cnt = 0;
        while (cursor <= delta + this.unit) {
          var offs = cursor / delta;
          dots[cnt] = {};
          dots[cnt].x = this.x + offs * this.w;
          var date = new Date(this.time_from + cursor);
          dots[cnt].time = this.time_from + cursor;
          if (carousel.zoom < hr * 24) {
            dots[cnt].text_format = "hour_minute";
          } else {
            dots[cnt].text_format = "default";
          }
          dots[cnt].visible = true;
          cursor += this.unit;
          cnt++;
        }
        dots[0].visible = false;
        dots[dots.length - 1].visible = false;
        cursor = this.unit_small - (this.time_from % this.unit_small);
        cnt = 0;
        while (cursor < delta) {
          var offs = cursor / delta;
          lines[cnt] = {};
          lines[cnt].x = this.x + offs * this.w;
          cursor += this.unit_small;
          cnt++;
        }
        this.boxes = [];
        this.boxes[i] = {};
        this.boxes[i].active = false;
        var boundingbox_size = 20;
        for (var i = 0; i < dots.length; i++) {
          var c = {};
          c.x = dots[i].x;
          c.y = this.y + this.h / 2;
          var s = boundingbox_size / 2;
          this.boxes[i] = {};
          this.boxes[i].x = c.x - s;
          this.boxes[i].y = c.y - s;
          this.boxes[i].w = s * 2;
          this.boxes[i].h = s * 2;
          this.boxes[i].time = dots[i].time;
          var mousex = mouse.x + 0;
          var mousey = mouse.y + 0;
          var x = this.boxes[i].x;
          var y = this.boxes[i].y;
          var w = this.boxes[i].w;
          var h = this.boxes[i].h;
          mousex -= this.parent.x;
          mousey -= this.parent.y;
          if (mousex <= x + w && mousex > x && mousey <= y + h && mousey > y) {
            this.boxes[i].active = true;
          }
        }
        this.lines = lines;
        this.dots = dots;
      };
      carousel.textcache = {};
      carousel.invalidateTextCache = function() {
        this.textcache = {};
      };
      var old_lang = lang + "";
      carousel.paint = function(a) {
        //invalidate cache if language has changed
        if (old_lang !== lang) this.invalidateTextCache();
        old_lang = lang + "";

        this.refresh();

        ctx.save();
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.clip();
        ctx.closePath();

        ctx.globalAlpha = 1;
        ctx.fillStyle = Colors.grey_400;
        ctx.fillRect(this.x, this.y + this.h / 2 - 2 / 2, this.w, 2);

        var height = this.h / 2 - 1;
        ctx.beginPath();
        ctx.moveTo(this.x + this.w / 2 - height, this.y);
        ctx.lineTo(this.x + this.w / 2 + height, this.y);
        ctx.lineTo(this.x + this.w / 2, this.y + height);
        ctx.fillStyle = Colors.grey_300;
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = Colors.grey_300;
        var dot_radius = 3;
        var text_padding = 2;
        for (var i = 0; i < this.boxes.length; i++) {
          //ctx.fillRect(this.boxes[i].x, this.boxes[i].y, this.boxes[i].w, this.boxes[i].h);
        }
        ctx.fillStyle = Colors.grey_400;
        var line_height = 6;
        for (var i = 0; i < this.lines.length; i++) {
          ctx.fillRect(
            this.lines[i].x,
            this.y + this.h / 2 - line_height / 2,
            1,
            line_height
          );
        }
        for (var i = 0; i < this.dots.length; i++) {
          var weight =
            (this.dots[i].x - (this.x + this.w / 2)) / (this.w * 0.5);
          if (weight > 1) weight = 1;
          if (weight < -1) weight = -1;
          ctx.beginPath();
          var c = {};
          c.x = this.dots[i].x;
          c.y = this.y + this.h / 2;
          ctx.arc(
            c.x - weight * dot_radius,
            c.y,
            dot_radius,
            0,
            2 * Math.PI,
            false
          );
          ctx.fillStyle = this.boxes[i].active
            ? Colors.grey_600
            : Colors.grey_400;
          ctx.fill();
          ctx.closePath();

          //draw text
          var alpha = 1;
          if (this.animating) {
            alpha =
              this.frac < 0.5 ? (1 - this.frac) * 2 : 2 * (this.frac - 0.5);
          }
          ctx.globalAlpha = alpha;
          var textSize = 10;
          ctx.font = textSize + "px " + (NO_CACHE ? "sans-serif" : "Roboto");
          if (i === 1 || i === this.dots.length - 2) {
            var date1 = new Date(this.dots[i].time);
            var text = "";
            var cached = this.textcache[
              this.dots[i].text_format + this.dots[i].time.toString()
            ];
            if (cached !== undefined) text = cached;
            else {
              if (this.dots[i].text_format === "hour_minute") {
                var options = {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: TableMapClient.settings.time_format_12_hr
                };
                text = date1.toLocaleTimeString(lang, options);
              } else {
                var options = {
                  month: "2-digit",
                  day: "2-digit"
                };
                text = date1.toLocaleDateString(lang, options);
              }
              //save the calculated value to text cache to improve performance
              this.textcache[
                this.dots[i].text_format + this.dots[i].time.toString()
              ] = text + "";
            }

            var w = ctx.measureText(text).width;
            ctx.fillText(
              text,
              this.dots[i].x - w / 2 - (w / 2) * weight,
              this.y + this.h / 2 + dot_radius + text_padding + textSize
            );
          }
          ctx.globalAlpha = 1;
        }
        ctx.restore();
      };
      carousel.current_time = new Date().getTime();
      carousel.zoom = 1000 * 60 * 60 * 4;

      timeline.add(clock);
      //   timeline.add(line);
      timeline.add(carousel);
      timeline.add(date_label);
      timeline.add(
        new CanvasElements.Button({
          w: 40,
          h: 40,
          elevated: false,
          style: "light",
          color: Colors.white,
          shape: ButtonShape.Circular,
          icon: String.fromCharCode(59647),
          iconsize: 18,
          alpha: 0.54,
          margin_right: 0,
          margin_top: 0,
          gravity: Gravity.Right,
          gravity2: Gravity.Top,
          onClick: function() {
            zoomTimeline(-carousel.zoom / 2);
          }
        })
      );
      timeline.add(
        new CanvasElements.Button({
          w: 40,
          h: 40,
          elevated: false,
          style: "light",
          color: Colors.white,
          shape: ButtonShape.Circular,
          icon: String.fromCharCode(59648),
          iconsize: 18,
          alpha: 0.54,
          margin_right: 0,
          margin_top: 0,
          gravity: Gravity.Left,
          gravity2: Gravity.Top,
          onClick: function() {
            zoomTimeline(carousel.zoom);
          }
        })
      );
      var timeR = null;
      function zoomTimeline(amount) {
        var newZ = carousel.zoom + amount;
        if (newZ < zoomClip.min) newZ = zoomClip.min;
        else if (newZ > zoomClip.max) newZ = zoomClip.max;
        var currentZ = carousel.zoom + 0;
        carousel.animating = true;
        timeR = Util.animate(
          timeR,
          Util.decelerateInterpolator,
          600,
          function(frac) {
            carousel.zoom = currentZ + (newZ - currentZ) * frac;
            carousel.frac = frac;
            carousel.manager.requestPaint();
          },
          function() {
            carousel.animating = false;
          }
        );
      }
      /*window.setInterval(function () {
                stepClock();
            }, 1);*/
      function stepClock() {
        var date = new Date();
        clock.setText(date);
        var divider = 60;
        finish = 360 * (date.getSeconds() / divider);
        if (prev_finish > finish) flip = !flip;

        line.x = clock.x + clock.w + 8;
        line.y = clock.y + 2;
        MainPage.paintneeded = true;
        prev_finish = finish + 0;
      }
      stepClock();

      var editBtn = new CanvasElements.Button({
        text: "EDIT",
        gravity: Gravity.Right,
        gravity2: Gravity.CenterVertical,
        onClick: function() {
          EditPage.tablemap = MainPage.tablemap;
          PageManager.navigate(Pages.Edit);
        }
      });
      MainPage.toolbar.add(editBtn);
      MainPage.toolbar.add(
        new CanvasElements.Button({
          text: "DELETE",
          gravity: Gravity.Left,
          gravity2: Gravity.CenterVertical,
          onClick: function() {
            new CanvasElements.Dialog.Builder()
              .setIcon(String.fromCharCode(59527))
              .setMessage(tm_strings[lang]["dialog_delete_tablemap"])
              .setPositiveButton(tm_strings[lang]["dialog_yes"])
              .setNegativeButton(tm_strings[lang]["dialog_no"])
              .setPositiveAction(function() {
                MainPage.tablemap.remove(function() {
                  MainPage.tablemap = new TableMap();
                });
              })
              .show();
          }
        })
      );

      manager.add(MainPage.toolbar);
      manager.add(timeline);
      manager.disable();

      MainPage.checkIn = function() {
        var panel = new CanvasElements.Panel({
          w: 200,
          h: 20 + 10 + 10 + 12 + 1,
          padding: 0,
          padding_left: 16,
          padding_right: 16,
          padding_top: 10,
          padding_bottom: 0,
          color: "#FFF",
          type: PanelType.None
        });
        panel.add(
          new CanvasElements.Label({
            text: "Results",
            w: 120,
            y: 20 + 10 + 10,
            h: 12,
            padding: 0,
            gravity: Gravity.Left
          })
        );
        panel.add(
          new CanvasElements.Button({
            w: 60,
            elevated: false,
            color: "#FFF",
            style: "light",
            gravity: Gravity.Top,
            gravity2: Gravity.Right
          })
        );
        panel.add(
          new CanvasElements.Input({
            w: 100,
            gravity: Gravity.Top,
            gravity2: Gravity.Left
          })
        );
        new CanvasElements.Dialog.Builder(MainPage.manager)
          .setPanel(panel)
          .setMessage("Enter reservation code")
          .setPositiveButton("CHECK IN")
          .setPositiveAction()
          .setNegativeButton(tm_strings[lang]["dialog_cancel"]);
        // .show();
      };
      MainPage.deactivate = function() {
        manager.disable();
        MainPage.active = false;
      };
      MainPage.activate = function() {
        manager.enable();
        MainPage.active = true;
      };
      MainPage.paint_needed = function() {
        return (
          (manager.paint_needed || MainPage.paintneeded) && MainPage.active
        );
      };
      MainPage.paint = function() {
        if (MainPage.tablemap !== undefined)
          MainPage.tablemap.mode = Pages.Main;
        timeline.x = canvas.scaledWidth / 2 - 100;

        MainPage.tablemap.paint(ctx);
        manager.paint();
        MainPage.paintneeded = false;
      };
    };

    /* Edit page initialization */
    EditPage.initialize = function() {
      EditPage.upload = false;
      EditPage.initialized = true;
      document.addEventListener(
        "mousemove",
        function(evt) {
          EditPage.onMouseMove(evt);
        }.bind(this),
        false
      );
      document.addEventListener(
        "mouseup",
        function(evt) {
          EditPage.onMouseUp(evt);
        }.bind(this),
        false
      );
      document.addEventListener(
        "keyup",
        function(evt) {
          EditPage.onKeyPress(evt);
        }.bind(this),
        false
      );
      var selectionMgr = new SelectionManager();
      var grabMgr = new GrabResizeManager();
      grabMgr.initialize(selectionMgr, map_canvas_id);
      grabMgr.enabled = true;
      EditPage.paintneeded = false;
      EditPage.grid = false;

      var deltas = {};
      var grabbingItem = "none";
      var selected_tab = 0;
      var manager = new CanvasElementManager(canvas);
      EditPage.toolbar = new CanvasElements.Panel({
        x: 0,
        y: 0,
        w: 0,
        h: dimen_toolbar_height,
        padding_left: 0,
        type: PanelType.Card,
        backcolor: color_toolbar,
        corner: 0
      });
      EditPage.toolbar.add(
        new CanvasElements.Button({
          text:
            tm_strings[lang][EditPage.upload ? "button_upload" : "button_save"],
          h: 24,
          gravity: Gravity.Right,
          gravity2: Gravity.CenterVertical,
          onClick: function() {
            selectionMgr.enabled = false;
            grabMgr.enabled = false;
            new CanvasElements.Dialog.Builder()
              .setPositiveButton(tm_strings[lang]["dialog_yes"])
              .setMessage(tm_strings[lang]["dialog_confirm_save"])
              .setIcon(String.fromCharCode(59527))
              .setNegativeButton(tm_strings[lang]["dialog_no"])
              .setPositiveAction(function() {
                selectionMgr.enabled = true;
                grabMgr.enabled = true;
                MainPage.tablemap = EditPage.tablemap;
                PageManager.navigate(Pages.Main);
                if (EditPage.upload) {
                  EditPage.tablemap.upload();
                  EditPage.upload = false;
                  this.text = tm_strings[lang]["button_save"];
                  EditPage.paintneeded = true;
                } else {
                  EditPage.tablemap.update();
                }
              })
              .setNegativeAction(function() {
                selectionMgr.enabled = true;
                grabMgr.enabled = true;
              })
              .show();
          }
        })
      );
      EditPage.toolbar.add(
        new CanvasElements.Button({
          w: 40,
          h: 40,
          elevated: false,
          style: "dark",
          color: Colors.bluegrey_500,
          shape: ButtonShape.Circular,
          icon: String.fromCharCode(59506),
          iconsize: 18,
          margin_right: 10 + 90,
          gravity: Gravity.Right,
          gravity2: Gravity.CenterVertical,
          onClick: function() {
            removeSelectedItems(true);
          }
        })
      );
      EditPage.toolbar.add(
        new CanvasElements.Button({
          w: 40,
          h: 40,
          elevated: false,
          style: "dark",
          color: Colors.bluegrey_500,
          shape: ButtonShape.Circular,
          icon: String.fromCharCode(57676),
          iconsize: 18,
          margin_left: 0,
          gravity: Gravity.Left,
          gravity2: Gravity.CenterVertical,
          onClick: function() {
            selectionMgr.enabled = false;
            grabMgr.enabled = false;
            new CanvasElements.Dialog.Builder()
              .setIcon(String.fromCharCode(59527))
              .setMessage(tm_strings[lang]["dialog_discard"])
              .setPositiveButton(tm_strings[lang]["dialog_action_discard"])
              .setNegativeButton(tm_strings[lang]["dialog_cancel"])
              .setNegativeAction(function(result) {
                selectionMgr.enabled = true;
                grabMgr.enabled = true;
              })
              .setPositiveAction(function(result) {
                PageManager.goBack();
                selectionMgr.enabled = true;
                grabMgr.enabled = true;
              })
              .show();
          }
        })
      );
      var label_tools = new CanvasElements.Label({
        text: tm_strings[lang]["tools"],
        h: 12,
        textcolor: "rgba(255, 255, 255, 0.54)",
        padding_left: 10,
        padding: 0,
        margin_left: 40 + 10,
        gravity: Gravity.Left,
        gravity2: Gravity.CenterVertical,
        divider_left: true,
        divider_color: "rgba(255, 255, 255, 0.3)"
      });
      label_tools.adjustWidthToText();
      EditPage.toolbar.add(label_tools);
      var radio_tools = new CanvasElements.RadioGroup();
      radio_tools.add(
        new CanvasElements.Button({
          w: 40,
          h: 40,
          elevated: false,
          style: "dark",
          color: Colors.bluegrey_500,
          shape: ButtonShape.Circular,
          icon: String.fromCharCode(58729),
          iconsize: 18,
          margin_left: 10,
          gravity: Gravity.Left,
          gravity2: Gravity.CenterVertical,
          onClick: function() {},
          toggleable: true,
          torightof: label_tools
        })
      );
      EditPage.toolbar.add(radio_tools);
      var W = 350;
      selectionMgr.constrain_box = {
        x: 0,
        y: dimen_toolbar_height,
        w: canvas.scaledWidth - W,
        h: canvas.scaledHeight - dimen_toolbar_height
      };
      var tab_height = 42;
      var ic_size = 18;
      var panel = new CanvasElements.Panel({
        x: canvas.scaledWidth - W,
        y: dimen_toolbar_height,
        w: W,
        h: canvas.scaledHeight - dimen_toolbar_height,
        type: PanelType.Card,
        backcolor: "#FFF"
      });
      var btn1 = new CanvasElements.Button({
        x: 0,
        y: 0,
        w: W / 3,
        h: tab_height,
        text: tm_strings[lang]["button_add_items"],
        elevated: false,
        corner: 0,
        onClick: function() {
          EditPage.toggleTab(0);
        }
      });
      var btn2 = new CanvasElements.Button({
        x: W / 3,
        y: 0,
        w: W / 3,
        h: tab_height,
        text: tm_strings[lang]["button_properties"],
        elevated: false,
        corner: 0,
        onClick: function() {
          EditPage.toggleTab(1);
        },
        textcolor: "rgba(0, 0, 0, 0.54)"
      });
      var btn3 = new CanvasElements.Button({
        x: (2 * W) / 3,
        y: 0,
        w: W / 3,
        h: tab_height,
        text: tm_strings[lang]["button_groups"],
        elevated: false,
        corner: 0,
        onClick: function() {
          EditPage.toggleTab(2);
        },
        textcolor: "rgba(0, 0, 0, 0.54)"
      });

      var tab1 = new CanvasElements.Panel({
        x: 0,
        y: tab_height,
        w: W,
        h: canvas.scaledHeight - tab_height,
        type: PanelType.None,
        corner: 0,
        paintoverride: true,
        padding_bottom: 0
      });
      tab1.add(
        new CanvasElements.Label({
          x: 0,
          y: 0,
          w: W,
          padding: 16,
          text: tm_strings[lang]["help_panel_add_items"],
          gravity: Gravity.Bottom,
          row_gap: 5,
          textcolor: "rgba(0, 0, 0, 0.54)",
          divider_top: true
        })
      );
      tab1.add(
        new CanvasElements.Label({
          x: 16,
          y: 16,
          w: W,
          padding: 0,
          text: tm_strings[lang]["common_items"],
          gravity: Gravity.Top,
          textcolor: "rgba(0, 0, 0, 0.54)"
        })
      );

      var tab2 = new CanvasElements.Panel({
        x: W,
        y: tab_height,
        w: W,
        h: panel.h - tab_height,
        type: PanelType.None,
        corner: 0,
        hidden: true,
        paintoverride: true,
        padding_bottom: 0
      });
      tab2.add(
        new CanvasElements.Label({
          x: 16,
          y: 16,
          w: W,
          padding: 0,
          text: tm_strings[lang]["appearance_n_behavior"],
          gravity: Gravity.Top,
          textcolor: "rgba(0, 0, 0, 0.54)"
        })
      );
      tab2.add(
        new CanvasElements.Label({
          x: 0,
          y: 0,
          w: W,
          padding: 16,
          text: tm_strings[lang]["help_panel_properties"],
          gravity: Gravity.Bottom,
          row_gap: 5,
          textcolor: "rgba(0, 0, 0, 0.54)",
          divider_top: true
        })
      );
      var col1 = new CanvasElements.Panel({
        x: 0,
        y: 16 * 1 + 12,
        w: W / 2,
        h: tab2.h,
        padding_right: 1,
        type: PanelType.None,
        corner: 0
      });
      col1.add(
        new CanvasElements.Label({
          y: 16 + 30 / 2 - 6,
          gravity: Gravity.Left,
          text: tm_strings[lang]["type"],
          padding: 0
        })
      );
      var items_type = [];
      for (var i = 0; i < TableMapItemType["server"].length; i++) {
        var item = { text: TableMapItemType[lang][i] };
        //                if (TableMapItemType["server"][i] === "Table")
        //                    item.icon = String.fromCharCode(59473);
        //                if (TableMapItemType["server"][i] === "Block")
        //                    item.icon = String.fromCharCode(57449);
        items_type.push(item);
      }
      col1.add(
        new CanvasElements.Dropdown({
          gravity: Gravity.TopRight,
          w: 90,
          h: 30,
          items: items_type
        })
      );
      var input_label = new CanvasElements.Input({
        y: 30 + 16 + 16,
        w: W / 2 - 16 - 1,
        h: 30,
        gravity: Gravity.Left,
        hint: tm_strings[lang]["label_hint"],
        allowedcharacters: AllowedChars.All
      });
      col1.add(input_label);

      var col1col1 = new CanvasElements.Panel({
        x: 0,
        y: 30 + 16 + 46,
        w: W / 4,
        h: 30 * 2 + 16 * 3 + 46,
        padding_right: 1,
        type: PanelType.None,
        corner: 0
      });
      col1col1.add(
        new CanvasElements.Label({
          y: 16 + 30 / 2 - 6,
          gravity: Gravity.Left,
          text: tm_strings[lang]["ID"],
          padding: 0
        })
      );
      col1col1.add(
        new CanvasElements.Input({
          gravity: Gravity.TopRight,
          w: 50,
          h: 30,
          text: "001"
        })
      );
      col1col1.add(
        new CanvasElements.Label({
          y: 16 + 30 / 2 - 6 + 46,
          gravity: Gravity.Left,
          text: tm_strings[lang]["x"],
          padding: 0
        })
      );
      col1col1.add(
        new CanvasElements.Input({
          gravity: Gravity.Right,
          y: 46 + 16,
          w: 50,
          h: 30,
          text: "0",
          minvalue: 0,
          allowedcharacters: AllowedChars.NumbersFraction
        })
      );
      col1col1.add(
        new CanvasElements.Image({
          y: 16 + 30 / 2 - 18 / 2 + 46 + 46,
          w: 18,
          h: 18,
          gravity: Gravity.Left,
          icon: String.fromCharCode(59604),
          alpha: 0.54
        })
      );
      col1col1.add(
        new CanvasElements.Input({
          gravity: Gravity.BottomRight,
          w: 50,
          h: 30,
          text: "0",
          minvalue: 0,
          allowedcharacters: AllowedChars.NumbersFraction
        })
      );
      var col1col2 = new CanvasElements.Panel({
        x: W / 4,
        y: 30 + 16 + 46,
        w: W / 4,
        h: 30 * 2 + 16 * 3 + 46,
        padding_right: 1,
        type: PanelType.None,
        corner: 0
      });
      col1col2.add(
        new CanvasElements.Image({
          y: 16 + 30 / 2 - 18 / 2,
          w: 18,
          h: 18,
          gravity: Gravity.Left,
          icon: String.fromCharCode(58394),
          alpha: 0.54
        })
      );
      col1col2.add(
        new CanvasElements.Input({
          gravity: Gravity.TopRight,
          w: 50,
          h: 30,
          text: "0",
          minvalue: 0,
          maxvalue: 360,
          allowedcharacters: AllowedChars.Numbers
        })
      );
      col1col2.add(
        new CanvasElements.Label({
          y: 16 + 30 / 2 - 6 + 46,
          gravity: Gravity.Left,
          text: tm_strings[lang]["y"],
          padding: 0
        })
      );
      col1col2.add(
        new CanvasElements.Input({
          gravity: Gravity.Right,
          y: 46 + 16,
          w: 50,
          h: 30,
          text: "0",
          minvalue: 0,
          allowedcharacters: AllowedChars.NumbersFraction
        })
      );
      col1col2.add(
        new CanvasElements.Image({
          y: 16 + 30 / 2 - 18 / 2 + 46 + 46,
          w: 18,
          h: 18,
          gravity: Gravity.Left,
          icon: String.fromCharCode(59605),
          alpha: 0.54
        })
      );
      col1col2.add(
        new CanvasElements.Input({
          gravity: Gravity.BottomRight,
          w: 50,
          h: 30,
          text: "0",
          minvalue: 0,
          allowedcharacters: AllowedChars.NumbersFraction
        })
      );

      col1.add(col1col1);
      col1.add(col1col2);
      tab2.add(col1);

      var col2 = new CanvasElements.Panel({
        x: W / 2,
        y: 16 * 1 + 12,
        w: W / 2,
        h: tab2.h,
        type: PanelType.None,
        corner: 0
      });
      col2.add(
        new CanvasElements.Label({
          y: 16 + 30 / 2 - 6,
          gravity: Gravity.Left,
          text: tm_strings[lang]["shape"],
          padding: 0
        })
      );
      var items_shape_type = [];
      for (var i = 0; i < MapItemShapeType["server"].length; i++) {
        var item = { text: MapItemShapeType[lang][i] };
        //                if (MapItemShapeType["server"][i] === "Rectangle")
        //                    item.icon = String.fromCharCode(59445);
        //                if (MapItemShapeType["server"][i] === "Circle")
        //                    item.icon = String.fromCharCode(59446);
        items_shape_type.push(item);
      }
      col2.add(
        new CanvasElements.Dropdown({
          gravity: Gravity.TopRight,
          w: 100,
          h: 30,
          items: items_shape_type
        })
      );
      col2.add(
        new CanvasElements.Label({
          y: 46 + 16 + 30 / 2 - 6,
          gravity: Gravity.Left,
          text: tm_strings[lang]["guest_capacity"],
          padding: 0
        })
      );
      col2.add(
        new CanvasElements.Input({
          gravity: Gravity.Right,
          y: 46 + 16,
          w: 110 / 2,
          h: 30,
          text: "4",
          minvalue: 1,
          maxvalue: 200,
          allowedcharacters: AllowedChars.Numbers
        })
      );
      var gap = 0;
      var he = 20;
      var offs = 16 + 30 + 16 + 46;
      col2.add(
        new CanvasElements.Checkbox({
          x: 0,
          y: offs + 0 * (he + gap),
          gravity: Gravity.Left,
          text: tm_strings[lang]["reservable"],
          state: CheckboxState.Checked,
          onStateChanged: function(state) {
            getFocusedItem().reservable = state;
            EditPage.paintneeded = true;
          }
        })
      );
      col2.add(
        new CanvasElements.Checkbox({
          x: 0,
          y: offs + 1 * (he + gap),
          gravity: Gravity.Left,
          text: tm_strings[lang]["occupyable"],
          state: CheckboxState.Checked
        })
      );
      col2.add(
        new CanvasElements.Checkbox({
          x: 0,
          y: offs + 2 * (he + gap),
          gravity: Gravity.Left,
          text: tm_strings[lang]["labelable"],
          state: CheckboxState.Checked
        })
      );
      col2.add(
        new CanvasElements.Checkbox({
          x: 0,
          y: offs + 3 * (he + gap),
          gravity: Gravity.Left,
          text: tm_strings[lang]["movable"],
          state: CheckboxState.Checked
        })
      );
      col2.add(
        new CanvasElements.Checkbox({
          x: 0,
          y: offs + 4 * (he + gap),
          gravity: Gravity.Left,
          text: tm_strings[lang]["editable"],
          state: CheckboxState.Checked
        })
      );
      col2.add(
        new CanvasElements.Checkbox({
          x: 0,
          y: offs + 5 * (he + gap),
          gravity: Gravity.Left,
          text: tm_strings[lang]["resizable"],
          state: CheckboxState.Checked
        })
      );
      var div1 = new CanvasElements.Divider({
        y: offs + 5 * (he + gap) + 20 + 16 + 16 * 1 + 12
      });
      tab2.add(div1);
      tab2.add(
        new CanvasElements.Label({
          x: 16,
          y: div1.y + 16,
          w: W,
          padding: 0,
          text: tm_strings[lang]["tags"],
          gravity: Gravity.Left,
          textcolor: "rgba(0, 0, 0, 0.54)"
        })
      );
      tab2.add(
        new CanvasElements.Button({
          y: div1.y + 16,
          text: tm_strings[lang]["button_add_new"],
          gravity: Gravity.Right,
          color: Colors.red_A200,
          style: "dark",
          onClick: function() {
            selectionMgr.enabled = false;
            grabMgr.enabled = false;
            var dialog_new_panel = new CanvasElements.Panel({
              x: 0,
              y: 0,
              w: 250,
              h: 30,
              type: PanelType.None,
              backcolor: "#FFF",
              no_events: false,
              padding_bottom: 0
            });
            var items_tag_type = [];
            for (var i = 0; i < MapItemTag["server"].length; i++) {
              var txt = MapItemTag[lang][i];
              var exists = false;
              for (var j = 0; j < tags.items.length; j++) {
                if (tags.items[j].text === txt) {
                  exists = true;
                  break;
                }
              }
              if (!exists) items_tag_type.push({ text: txt });
            }
            if (items_tag_type.length === 0) {
              new CanvasElements.Dialog.Builder()
                .setMessage(tm_strings[lang]["dialog_no_more_tags"])
                .setPositiveButton(tm_strings[lang]["dialog_ok"])
                .setNegativeButton(tm_strings[lang]["dialog_cancel"])
                .setPositiveAction(function(result) {
                  selectionMgr.enabled = true;
                  grabMgr.enabled = true;
                })
                .setNegativeAction(function() {
                  selectionMgr.enabled = true;
                  grabMgr.enabled = true;
                })
                .show();
            } else {
              dialog_new_panel.add(
                new CanvasElements.Dropdown({
                  x: 0,
                  gravity: Gravity.Right,
                  y: 0,
                  w: 110,
                  h: 20,
                  items: items_tag_type
                })
              );
              dialog_new_panel.add(
                new CanvasElements.Label({
                  x: 0,
                  gravity: Gravity.Left,
                  y: 10 - 6,
                  w: 250 - 16,
                  padding: 0,
                  text: tm_strings[lang]["dialog_select_type"],
                  alpha: 0.87
                })
              );
              new CanvasElements.Dialog.Builder(manager)
                .setPanel(dialog_new_panel)
                .setPositiveButton(tm_strings[lang]["dialog_ok"])
                .setNegativeButton(tm_strings[lang]["dialog_cancel"])
                .setPositiveAction(function(result) {
                  //dropdown
                  var itemName =
                    result.elements[0].items[result.elements[0].selecteditem]
                      .text;
                  L.i("added tag: " + itemName, "table_map", 798);
                  tags.addItem({ text: itemName });
                  getFocusedItem().tags.push(
                    MapItemTag["server"][MapItemTag[lang].indexOf(itemName)]
                  );
                  selectionMgr.enabled = true;
                  grabMgr.enabled = true;
                })
                .setNegativeAction(function() {
                  selectionMgr.enabled = true;
                  grabMgr.enabled = true;
                })
                .show();
            }
          }
        })
      );
      var tags = new CanvasElements.TagContainer({
        x: 0,
        y: div1.y + 16 + 20 + 16,
        w: W - 2 * 16,
        h: 160,
        gravity: Gravity.Left,
        onRemoveItem: function(itemIndex) {
          var itemName = this.items[itemIndex].text;
          L.i("removed tag: " + itemName, "table_map", 916);
          getFocusedItem().tags.splice(itemIndex, 1);
        }
      });
      tab2.add(tags);
      tab2.add(col2);
      tab2.enabled = false;
      selectionMgr.onItemFocus = function() {
        EditPage.initializeTab2();
      };
      selectionMgr.onItemDefocus = function() {
        EditPage.initializeTab2();
      };
      grabMgr.onPropertyChange = function() {
        EditPage.initializeTab2();
      };

      var tab3 = new CanvasElements.Panel({
        x: W * 2,
        y: tab_height,
        w: W,
        h: panel.h - tab_height,
        type: PanelType.None,
        corner: 0,
        hidden: true,
        paintoverride: true,
        padding_bottom: 0
      });
      var tab3_bottomLabel = new CanvasElements.Label({
        x: 0,
        y: 0,
        w: W,
        padding: 16,
        text: tm_strings[lang]["help_panel_groups"],
        gravity: Gravity.Bottom,
        row_gap: 5,
        textcolor: "rgba(0, 0, 0, 0.54)",
        divider_top: true
      });
      tab3.add(tab3_bottomLabel);
      var groupPanels = [];
      var g = function() {
        var r = EditPage.tablemap.getActiveFloor().table_groups;
        return r === undefined ? [] : r;
      };
      for (var i = 0; i < g().length; i++) {
        EditPage.addGroup(g()[i], true);
      }

      //add new group button
      var cntG = 1;
      var addNewBtn = new CanvasElements.Button({
        gravity: Gravity.BottomRight,
        margin_bottom: tab3_bottomLabel.h + 16,
        text: tm_strings[lang]["button_add_new"],
        style: "dark",
        color: Colors.red_A200,
        onClick: function() {
          selectionMgr.enabled = false;
          grabMgr.enabled = false;
          var dialog_new_panel = new CanvasElements.Panel({
            x: 0,
            y: 0,
            w: 250,
            h: 30,
            type: PanelType.None,
            backcolor: "#FFF",
            no_events: false,
            padding_bottom: 0
          });
          dialog_new_panel.add(
            new CanvasElements.Input({
              x: 0,
              gravity: Gravity.Right,
              text: tm_strings[lang]["group"].replace("{0}", cntG++),
              y: 0,
              w: 90,
              h: 20
            })
          );
          dialog_new_panel.add(
            new CanvasElements.Label({
              x: 0,
              gravity: Gravity.Left,
              y: 10 - 6,
              w: 250 - 32 - 90,
              padding: 0,
              text: tm_strings[lang]["dialog_enter_group_name"],
              alpha: 0.87
            })
          );
          new CanvasElements.Dialog.Builder(manager)
            .setPanel(dialog_new_panel)
            .setPositiveButton(tm_strings[lang]["dialog_ok"])
            .setNegativeButton(tm_strings[lang]["dialog_cancel"])
            .setPositiveAction(function(result) {
              var itemName = result.elements[0].text;
              var group = new TableMap.Group();
              group.label = itemName;
              for (
                var i = 0;
                i < selectionMgr.selected_object_indeces.length;
                i++
              ) {
                group.item_ids.push(
                  selectionMgr.managed_objects[
                    selectionMgr.selected_object_indeces[i]
                  ].ID
                );
              }
              EditPage.addGroup(group);
              selectionMgr.enabled = true;
              grabMgr.enabled = true;
            })
            .setNegativeAction(function() {
              selectionMgr.enabled = true;
              grabMgr.enabled = true;
            })
            .show();
        }
      });
      tab3.add(addNewBtn);

      var tabLineThickness = 3;
      var tabLineOffset = 0;
      var tabLineTimer = null;
      panel.add(btn1);
      panel.add(btn2);
      panel.add(btn3);
      panel.add(tab1);
      panel.add(tab2);
      panel.add(tab3);
      var ic1 = new CanvasElements.Image({
        x: (tab_height - ic_size) / 2,
        y: (tab_height - ic_size) / 2,
        w: ic_size,
        h: ic_size,
        icon: String.fromCharCode(57670),
        backcolor: Colors.black,
        alpha: 0.54
      });
      var ic2 = new CanvasElements.Image({
        x: (tab_height - ic_size) / 2 + W / 2,
        y: (tab_height - ic_size) / 2,
        w: ic_size,
        h: ic_size,
        icon: String.fromCharCode(59485),
        backcolor: Colors.black,
        alpha: 0.2
      });
      manager.add(panel);
      var btnW = 3 * map_unit;
      var btnH = 2 * map_unit;
      var btnTableTAB = new CanvasElements.Button({
        x: W / 4 - btnW / 2,
        y: 16 + 12 + 16,
        w: btnW,
        h: btnH,
        style: "dark",
        text: tm_strings[lang]["table"],
        color: Colors.red_400,
        elevationresting: 0,
        elevationelevated: 4,
        ripple: false,
        cursor: "grab",
        cursorclicked: "grabbing",
        onPress: function() {
          if (!movedMouseDown) grabbingItem = "Table";
        },
        onClick: function() {
          grabbingItem = "none";
        }
      });
      var btnBlockTAB = new CanvasElements.Button({
        x: (3 * W) / 4 - btnW / 2,
        y: 16 + 12 + 16,
        w: btnW,
        h: btnH,
        text: tm_strings[lang]["block"],
        color: Colors.grey_300,
        elevationresting: 0,
        elevationelevated: 4,
        ripple: false,
        cursor: "grab",
        cursorclicked: "grabbing",
        onPress: function() {
          if (!movedMouseDown) grabbingItem = "Block";
        },
        onClick: function() {
          grabbingItem = "none";
        }
      });
      tab1.add(btnTableTAB);
      tab1.add(btnBlockTAB);
      var btnTable = new CanvasElements.Button({
        x: canvas.scaledWidth - ((3 * W) / 4 - btnW / 2) - btnW,
        y: 16 + 12 + 16 + tab_height + dimen_toolbar_height,
        w: btnW,
        h: btnH,
        style: "dark",
        text: tm_strings[lang]["table"],
        color: Colors.red_400,
        elevationresting: 4,
        elevationelevated: 4,
        ripple: false,
        cursor: "grab",
        cursorclicked: "grabbing",
        hidden: true,
        onClick: function() {
          EditPage.placeItem("Table", btnTable);
          grabbingItem = "none";
          btnTable.hidden = true;
          btnTable.x = canvas.scaledWidth - (2 * (W / 2) - (16 + 8) + 8);
          btnTable.y = 16 + 12 + 16 + tab_height + dimen_toolbar_height;
          Util.animate(null, Util.linearInterpolator, 200, function(frac) {
            btnTableTAB.alpha = frac;
          });
          btnTableTAB.alpha = 0;
          btnTableTAB.hidden = false;
          selectionMgr.enabled = true;
          EditPage.paintneeded = true;
          movedTable = false;
          $(canvas).css("cursor", "auto");
          L.i("PLACED TABLE", "table_map", 602);
        }
      });
      var btnBlock = new CanvasElements.Button({
        x: canvas.scaledWidth - (W / 4 - btnW / 2) - btnW,
        y: 16 + 12 + 16 + tab_height + dimen_toolbar_height,
        w: btnW,
        h: btnH,
        text: tm_strings[lang]["block"],
        color: Colors.grey_300,
        elevationresting: 4,
        elevationelevated: 4,
        ripple: false,
        cursor: "grab",
        cursorclicked: "grabbing",
        hidden: true,
        onClick: function() {
          EditPage.placeItem("Block", btnBlock);
          grabbingItem = "none";
          btnBlock.hidden = true;
          btnBlock.x = canvas.scaledWidth - (W / 2 - (16 + 8) + 16);
          btnBlock.y = 16 + 12 + 16 + tab_height + dimen_toolbar_height;
          Util.animate(null, Util.linearInterpolator, 200, function(frac) {
            btnBlockTAB.alpha = frac;
          });
          btnBlockTAB.alpha = 0;
          btnBlockTAB.hidden = false;
          selectionMgr.enabled = true;
          EditPage.paintneeded = true;
          movedBlock = false;
          $(canvas).css("cursor", "auto");
          //TODO implement placement
          L.i("PLACED BLOCK", "table_map", 633);
        }
      });
      manager.add(btnTable);
      manager.add(btnBlock);
      var tabLine = new CanvasElements.CustomElement({});
      tabLine.paint = function(a) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = Colors.red_A200;
        ctx.fillRect(
          btn1.x + panel.x + tabLineOffset,
          btn1.y + panel.y + btn1.h - tabLineThickness,
          W / 3,
          tabLineThickness
        );
      };
      manager.add(tabLine);
      manager.add(EditPage.toolbar);
      manager.disable();

      //initialize loaded TableMap
      if (EditPage.tablemap !== undefined) {
        if (EditPage.tablemap.getActiveFloor().items !== undefined) {
          for (
            var i = 0;
            i < EditPage.tablemap.getActiveFloor().items.length;
            i++
          ) {
            var item = EditPage.tablemap.getActiveFloor().items[i];
            selectionMgr.initialize(item);
            grabMgr.addObject(item);
            grabMgr.enabled = true;
          }
        }
        if (EditPage.tablemap.getActiveFloor().table_groups !== undefined) {
          for (
            var i = 0;
            i < EditPage.tablemap.getActiveFloor().table_groups.length;
            i++
          ) {
            EditPage.addGroup(
              EditPage.tablemap.getActiveFloor().table_groups[i],
              true
            );
          }
        }
      }

      var current_id = 0;
      var group_deleting_index = -1;
      var item_ids = [];
      EditPage.placeItem = function(type, elem) {
        var item = new TableMap.Item();
        //TODO implement snapping over here
        item.x = elem.x;
        item.y = elem.y;
        item.w = elem.w;
        item.h = elem.h;
        item.type = type;
        if (type === "Block") {
          item.reservable = false;
          item.occupyable = false;
          item.table_capacity = 1;
        }

        var found = false;
        for (var i = 0; i < item_ids.length; i++) {
          if (item_ids[i] === undefined) {
            found = true;
            current_id = i + 0;
            item_ids[current_id] = true;
            break;
          }
        }
        if (!found) current_id = item_ids.length;
        var id = current_id + 1;
        if (!found) {
          item_ids[current_id] = true;
        }

        item.ID = (id < 10 ? "00" : id < 100 ? "0" : "") + id;
        item.label = tm_strings[lang]["label"].replace("{0}", id);
        EditPage.tablemap.getActiveFloor().items.push(item);
        selectionMgr.initialize(item);
        grabMgr.addObject(item);
        grabMgr.enabled = true;

        selectionMgr.removeAllSelections();
        selectionMgr.focus(item);
        EditPage.toggleTab(1);
      };
      EditPage.deactivate = function() {
        manager.disable();
        EditPage.active = false;
      };
      EditPage.activate = function() {
        manager.enable();
        EditPage.active = true;
      };
      EditPage.paint_needed = function() {
        return (
          (grabMgr.paint_needed ||
            selectionMgr.paint_needed ||
            manager.paint_needed ||
            EditPage.paintneeded) &&
          EditPage.active
        );
      };
      EditPage.paint = function() {
        if (EditPage.tablemap !== undefined)
          EditPage.tablemap.mode = Pages.Edit;
        panel.x = canvas.scaledWidth - W;
        panel.h = canvas.scaledHeight - dimen_toolbar_height;
        tab1.h = panel.h - tab_height;
        tab2.h = panel.h - tab_height;
        tab3.h = panel.h - tab_height;
        if (grabbingItem !== "Table")
          btnTable.x = canvas.scaledWidth - ((3 * W) / 4 - btnW / 2) - btnW;
        if (grabbingItem !== "Block")
          btnBlock.x = canvas.scaledWidth - (W / 4 - btnW / 2) - btnW;

        var padding = 10;
        var Goffset = padding;
        for (var i = 0; i < groupPanels.length; i++) {
          groupPanels[i].y = Goffset;
          Goffset += padding + groupPanels[i].h; //* (groupPanels[i].h / groupPanels[i].org_height)
        }

        selectionMgr.constrain_box = {
          x: 0,
          y: dimen_toolbar_height,
          w: canvas.scaledWidth - W,
          h: canvas.scaledHeight - dimen_toolbar_height
        };

        //TODO off-screen canvas rendering for optimalization
        if (EditPage.grid) {
          ctx.fillStyle = Colors.grey_300;
          for (var i = 0; i < canvas.scaledWidth; i += map_unit) {
            ctx.fillRect(i, 0, 1, canvas.scaledHeight);
          }
          for (var i = 0; i < canvas.scaledHeight; i += map_unit) {
            ctx.fillRect(0, i, canvas.scaledWidth, 1);
          }
          ctx.setLineDash([5, 5]);
          ctx.strokeStyle = Colors.grey_300;
          ctx.lineWidth = 0.25;
          for (var i = map_unit / 2; i < canvas.scaledWidth; i += map_unit) {
            ctx.moveTo(i + 0.5, 0);
            ctx.lineTo(i + 0.5, canvas.scaledHeight);
            ctx.stroke();
            //ctx.fillRect(i, 0, 1, canvas.scaledHeight);
          }
          for (var i = map_unit / 2; i < canvas.scaledHeight; i += map_unit) {
            ctx.moveTo(0, i + 0.5);
            ctx.lineTo(canvas.scaledWidth, i + 0.5);
            ctx.stroke();
            //ctx.fillRect(0, i, canvas.scaledWidth, 1);
          }
          ctx.setLineDash([0]);
        }
        EditPage.tablemap.paint(ctx);
        selectionMgr.paint(ctx);
        grabMgr.paint(ctx);
        manager.paint();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000";
        ctx.globalAlpha = 0.12;
        ctx.beginPath();
        ctx.moveTo(panel.x, panel.y + btn1.h - 0.5);
        ctx.lineTo(panel.x + W, panel.y + btn1.h - 0.5);
        ctx.closePath();
        ctx.stroke();

        ctx.globalAlpha = 0.05;
        ctx.fillStyle = Colors.black;
        ctx.fillRect(
          btn1.x + panel.x + selected_tab * (W / 3),
          btn1.y + panel.y + btn1.h - tab_height,
          W / 3,
          tab_height - tabLineThickness
        );
        ctx.globalAlpha = 1;

        EditPage.paintneeded = false;
      };
      EditPage.toggleTab = function(tab_to) {
        var from = tabLineOffset + 0;
        var to = 0;
        var tab_from = selected_tab + 0;
        if (tab_to !== undefined) {
          if (tab_to === 1) {
            if (selected_tab === 1) return null;
            selected_tab = 1;
            to = W / 3;
          } else if (tab_to === 0) {
            if (selected_tab === 0) return null;
            selected_tab = 0;
            to = 0;
          } else if (tab_to === 2) {
            if (selected_tab === 2) return null;
            selected_tab = 2;
            to = (2 * W) / 3;
          }
        }
        btn1.textcolor =
          "rgba(0, 0, 0," + (selected_tab === 0 ? 0.87 : 0.54) + ")";
        btn2.textcolor =
          "rgba(0, 0, 0," + (selected_tab === 1 ? 0.87 : 0.54) + ")";
        btn3.textcolor =
          "rgba(0, 0, 0," + (selected_tab === 2 ? 0.87 : 0.54) + ")";

        L.i("Navigated to tab: " + selected_tab, "table_map", 1260);
        tab1.hidden = tab_to === 1 || tab_to === 2;
        tab2.hidden = tab_to === 0 || tab_to === 2;
        tab3.hidden = tab_to === 1 || tab_to === 0;
        if (tab_to === 1) EditPage.initializeTab2();

        var f_tab3 = tab3.x + 0;
        var t_tab3 = (2 - selected_tab) * panel.w;
        var f_tab2 = tab2.x + 0;
        var t_tab2 = (1 - selected_tab) * panel.w;
        var f_tab1 = tab1.x + 0;
        var t_tab1 = (0 - selected_tab) * panel.w;

        if (tab_to === 0) {
          btnTable.y = 16 + 12 + 16 + tab_height + dimen_toolbar_height;
          btnBlock.y = 16 + 12 + 16 + tab_height + dimen_toolbar_height;
        } else {
          btnTable.y = -500;
          btnBlock.y = -500;
        }

        tabLineTimer = Util.animate(
          tabLineTimer,
          Util.decelerateInterpolator,
          300,
          function(frac) {
            tabLineOffset = from + (to - from) * frac;
            tab3.x = f_tab3 + (t_tab3 - f_tab3) * frac;
            tab2.x = f_tab2 + (t_tab2 - f_tab2) * frac;
            tab1.x = f_tab1 + (t_tab1 - f_tab1) * frac;
          }
        );
      };
      var item = null;
      EditPage.initializeTab2 = function() {
        if (selectionMgr.getFocusedItem() === undefined) {
          tab2.enabled = false;
          tab2.focused = false;
          tab2.onDefocus();

          tab2.elements[2].elements[3].elements[1].text = "-";
          tab2.elements[2].elements[3].elements[3].text = "-";
          tab2.elements[2].elements[3].elements[5].text = "-";
          tab2.elements[2].elements[4].elements[1].text = "-";
          tab2.elements[2].elements[4].elements[3].text = "-";
          tab2.elements[2].elements[4].elements[5].text = "-";
          input_label.text = "";
          tab2.elements[7].elements[3].text = "-";
          tab2.elements[7].elements[4].state = CheckboxState.UnChecked;
          tab2.elements[7].elements[5].state = CheckboxState.UnChecked;
          tab2.elements[7].elements[6].state = CheckboxState.UnChecked;
          tab2.elements[7].elements[7].state = CheckboxState.UnChecked;
          tab2.elements[7].elements[8].state = CheckboxState.UnChecked;
          tab2.elements[7].elements[9].state = CheckboxState.UnChecked;
          tab2.elements[6].items = [];
          item = null;
        } else {
          //if (item === selectionMgr.getFocusedItem())
          //    return null;
          item = selectionMgr.getFocusedItem();
          tab2.enabled = true;
          tab2.elements[2].elements[3].elements[1].text = item.ID;
          tab2.elements[2].elements[3].elements[1].onTextEnter = function() {
            EditPage.paintneeded = true;
            item.ID = this.text;
          };
          tab2.elements[2].elements[3].elements[3].text = (
            item.x / map_unit
          ).toString();
          tab2.elements[2].elements[3].elements[3].onTextEnter = function() {
            EditPage.paintneeded = true;
            item.x = (Math.floor(parseFloat(this.text) * 2) / 2) * map_unit;
            this.text = (item.x / map_unit).toString();
          };
          tab2.elements[2].elements[3].elements[5].text = (
            item.w / map_unit
          ).toString();
          tab2.elements[2].elements[3].elements[5].onTextEnter = function() {
            EditPage.paintneeded = true;
            item.w = (Math.floor(parseFloat(this.text) * 2) / 2) * map_unit;
            this.text = (item.w / map_unit).toString();
          };
          tab2.elements[2].elements[4].elements[1].text = item.rotation.toString();
          tab2.elements[2].elements[4].elements[1].onTextEnter = function() {
            EditPage.paintneeded = true;
            item.rotation = parseFloat(this.text);
          };
          tab2.elements[2].elements[4].elements[3].text = (
            (item.y - dimen_toolbar_height) /
            map_unit
          ).toString();
          tab2.elements[2].elements[4].elements[3].onTextEnter = function() {
            EditPage.paintneeded = true;
            item.y =
              (Math.floor(parseFloat(this.text) * 2) / 2) * map_unit +
              dimen_toolbar_height;
            this.text = ((item.y - dimen_toolbar_height) / map_unit).toString();
          };
          tab2.elements[2].elements[4].elements[5].text = (
            item.h / map_unit
          ).toString();
          tab2.elements[2].elements[4].elements[5].onTextEnter = function() {
            EditPage.paintneeded = true;
            item.h = (Math.floor(parseFloat(this.text) * 2) / 2) * map_unit;
            this.text = (item.h / map_unit).toString();
          };
          input_label.text = item.label.toString();
          input_label.onTextEnter = function() {
            EditPage.paintneeded = true;
            item.label = this.text;
          };
          //type dropdown
          tab2.elements[2].elements[1].selecteditem = TableMapItemType[
            "server"
          ].indexOf(item.type);
          tab2.elements[2].elements[1].onItemSelected = function() {
            item.type = TableMapItemType["server"][this.selecteditem];
          };
          tab2.elements[7].elements[1].selecteditem = MapItemShapeType[
            "server"
          ].indexOf(item.shape.type);
          tab2.elements[7].elements[1].onItemSelected = function() {
            item.shape.type = MapItemShapeType["server"][this.selecteditem];
          };
          tab2.elements[7].elements[3].text = item.table_capacity.toString();
          tab2.elements[7].elements[3].onTextEnter = function() {
            EditPage.paintneeded = true;
            item.table_capacity = parseFloat(this.text);
          };

          tab2.elements[7].elements[4].checked = item.reservable;
          tab2.elements[7].elements[5].checked = item.occupyable;
          tab2.elements[7].elements[6].checked = item.labelable;
          tab2.elements[7].elements[7].checked = item.movable;
          tab2.elements[7].elements[8].checked = item.editable;
          tab2.elements[7].elements[9].checked = item.resizable;
          tab2.elements[7].elements[4].state = item.reservable
            ? CheckboxState.Checked
            : CheckboxState.UnChecked;
          tab2.elements[7].elements[5].state = item.occupyable
            ? CheckboxState.Checked
            : CheckboxState.UnChecked;
          tab2.elements[7].elements[6].state = item.labelable
            ? CheckboxState.Checked
            : CheckboxState.UnChecked;
          tab2.elements[7].elements[7].state = item.movable
            ? CheckboxState.Checked
            : CheckboxState.UnChecked;
          tab2.elements[7].elements[8].state = item.editable
            ? CheckboxState.Checked
            : CheckboxState.UnChecked;
          tab2.elements[7].elements[9].state = item.resizable
            ? CheckboxState.Checked
            : CheckboxState.UnChecked;
          tab2.elements[7].elements[4].onStateChanged = function() {
            item.reservable = this.checked;
            tab2.elements[7].elements[2].enabled = this.checked;
            tab2.elements[7].elements[3].enabled = this.checked;
            if (!this.checked) tab2.elements[7].elements[3].text = "-";
            else
              tab2.elements[7].elements[3].text = item.table_capacity.toString();
          };
          tab2.elements[7].elements[5].onStateChanged = function() {
            item.occupyable = this.checked;
          };
          tab2.elements[7].elements[6].onStateChanged = function() {
            item.labelable = this.checked;
            input_label.enabled = this.checked;
            if (!this.checked) input_label.text = "-";
            else input_label.text = item.label.toString();
          };
          tab2.elements[7].elements[7].onStateChanged = function() {
            item.movable = this.checked;
          };
          tab2.elements[7].elements[8].onStateChanged = function() {
            item.editable = this.checked;
          };
          tab2.elements[7].elements[9].onStateChanged = function() {
            item.resizable = this.checked;
          };
          tab2.elements[7].elements[4].onStateChanged();
          tab2.elements[7].elements[4].onStateChanged();
          tab2.elements[7].elements[5].onStateChanged();
          tab2.elements[7].elements[6].onStateChanged();
          tab2.elements[7].elements[7].onStateChanged();
          tab2.elements[7].elements[8].onStateChanged();
          tab2.elements[7].elements[9].onStateChanged();

          tags.items = [];
          if (item.tags === undefined) item.tags = [];
          for (var i = 0; i < item.tags.length; i++) {
            tags.addItem(
              {
                text:
                  MapItemTag[lang][MapItemTag["server"].indexOf(item.tags[i])]
              },
              true
            );
          }
        }
      };
      EditPage.addGroup = function(group, no_anim) {
        L.i("added new table group: " + group.label, "table_map", 1033);

        var Gheight = 10 + 20 + 5 + 12 + 10 + 20 + 10;
        var index = g().length + 0;
        g().push(group);
        var groupPanel = new CanvasElements.Panel({
          type: PanelType.Frame,
          w: (W / 4) * 3,
          h: Gheight,
          gravity: Gravity.CenterHorizontal,
          y: 0,
          padding_left: 10,
          padding_top: 10,
          padding_bottom: 10,
          padding_right: 10
        });
        groupPanel.add(
          new CanvasElements.Input({
            additionalinfo: groupPanels.length + 0,
            gravity: Gravity.TopLeft,
            hint: tm_strings[lang]["label_hint"],
            text: group.label,
            w: 110,
            onTextEnter: function() {
              EditPage.tablemap.getActiveFloor().table_groups[
                this.additionalinfo
              ].label = this.text;
            }
          })
        );
        var mems = [];
        for (var j = 0; j < group.item_ids.length; j++) {
          mems.push({ text: group.item_ids[j] });
        }
        var members = new CanvasElements.TagContainer({
          x: 10,
          y: 10 * 2 + 5 + 20 + 12,
          w: (W / 4) * 3 - 2 * 10,
          h: 100,
          items: mems
        });
        var label_capacity = new CanvasElements.Label({
          gravity: Gravity.Left,
          text: tm_strings[lang]["guest_capacity"] + "0",
          padding: 0,
          alpha: 0.54,
          w: (W / 4) * 3 - 2 * 10,
          y: 20 + 10 + 5
        });
        groupPanel.add(members);
        //remove group button
        groupPanel.add(
          new CanvasElements.Button({
            additionalinfo: index,
            x: (W / 4) * 3 - 40 - 1,
            y: 0 + 1,
            icon: String.fromCharCode(59506),
            textcolor: "rgba(0, 0, 0, 0.54)",
            shape: ButtonShape.Circular,
            elevated: false,
            w: 40,
            h: 40,
            onClick: function(info) {
              selectionMgr.enabled = false;
              grabMgr.enabled = false;
              group_deleting_index = info;
              L.i(
                "group deleting index: " + group_deleting_index,
                "table_map",
                1307
              );
              new CanvasElements.Dialog.Builder(manager)
                .setMessage(tm_strings[lang]["dialog_delete_group"])
                .setIcon(String.fromCharCode(59527))
                .setPositiveButton(tm_strings[lang]["dialog_yes"])
                .setNegativeButton(tm_strings[lang]["dialog_no"])
                .setPositiveAction(function(result) {
                  selectionMgr.enabled = true;
                  grabMgr.enabled = true;
                  EditPage.removeGroup(group_deleting_index);
                })
                .setNegativeAction(function(result) {
                  selectionMgr.enabled = true;
                  grabMgr.enabled = true;
                })
                .show();
            }
          })
        );
        //select group members button
        groupPanel.add(
          new CanvasElements.Button({
            x: (W / 4) * 3 - 80 - 1,
            y: 0 + 1,
            icon: String.fromCharCode(57698),
            textcolor: "rgba(0, 0, 0, 0.54)",
            shape: ButtonShape.Circular,
            elevated: false,
            w: 40,
            h: 40,
            onClick: function() {
              selectionMgr.removeAllSelections();
              for (var ind = 0; selectionMgr.managed_objects.length; ind++) {
                for (var j = 0; j < group.item_ids.length; j++) {
                  if (selectionMgr.managed_objects[ind] !== undefined) {
                    if (
                      selectionMgr.managed_objects[ind].ID === group.item_ids[j]
                    )
                      selectionMgr.addSelection(
                        selectionMgr.managed_objects[ind]
                      );
                  }
                }
              }
            }
          })
        );
        //add group member button
        groupPanel.add(
          new CanvasElements.Button({
            x: (W / 4) * 3 - 120 - 1,
            y: 0 + 1,
            icon: String.fromCharCode(57669),
            textcolor: "rgba(0, 0, 0, 0.54)",
            shape: ButtonShape.Circular,
            elevated: false,
            w: 40,
            h: 40,
            onClick: function() {
              var dialog_new_panel = new CanvasElements.Panel({
                x: 0,
                y: 0,
                w: 250,
                h: 30,
                type: PanelType.None,
                backcolor: "#FFF",
                no_events: false,
                padding_bottom: 0
              });
              dialog_new_panel.add(
                new CanvasElements.Input({
                  x: 0,
                  gravity: Gravity.Right,
                  y: 0,
                  w: 110,
                  h: 20,
                  text: "001"
                })
              );
              dialog_new_panel.add(
                new CanvasElements.Label({
                  x: 0,
                  gravity: Gravity.Left,
                  y: 10 - 6,
                  w: 250 - 32 - 90,
                  padding: 0,
                  text: tm_strings[lang]["dialog_enter_item_id"],
                  alpha: 0.87
                })
              );
              var info_text = new CanvasElements.Label({
                text:
                  "Cound not find item with this ID, please try another one.",
                gravity: Gravity.Left,
                y: 10 - 6 + (20 + 3),
                w: 250 - 16,
                alpha: 0,
                padding: 0
              });
              selectionMgr.enabled = false;
              grabMgr.enabled = false;
              var layout_switched = false;
              dialog_new_panel.add(info_text);
              var builder = new CanvasElements.Dialog.Builder(manager)
                .setPanel(dialog_new_panel)
                .setPositiveButton(tm_strings[lang]["dialog_ok"])
                .setNegativeButton(tm_strings[lang]["dialog_cancel"])
                .setPositiveAction(function(result) {
                  var itemName = result.elements[0].text;
                  var itemfound = false;
                  var itms = EditPage.tablemap.getActiveFloor().items;
                  var qItem;
                  for (var i = 0; i < itms.length; i++) {
                    if (itms[i].ID === itemName) {
                      qItem = itms[i];
                      itemfound = true;
                      break;
                    }
                  }
                  if (!itemfound) {
                    if (!layout_switched) {
                      dialog_new_panel.h += 2 * (12 + 3);
                      info_text.alpha = 0.54;
                      this.y -= (2 * (12 + 3)) / 2;
                      this.h += 2 * (12 + 3);
                      EditPage.paintneeded = true;
                    }
                    this.preventHide();
                    layout_switched = true;
                  } else {
                    selectionMgr.enabled = true;
                    grabMgr.enabled = true;
                    L.i(
                      "added table group member: " + itemName,
                      "table_map",
                      994
                    );
                    var exists = false;
                    for (var i = 0; i < members.items.length; i++) {
                      if (members.items[i].text === itemName) {
                        exists = true;
                        break;
                      }
                    }
                    if (!exists) {
                      members.addItem({ text: itemName });
                      group.item_ids.push(itemName);
                      group.table_capacity +=
                        qItem.reservable && qItem.occupyable
                          ? qItem.table_capacity
                          : 0;
                      label_capacity.text =
                        tm_strings[lang]["guest_capacity"] +
                        group.table_capacity.toString();
                    }
                  }
                })
                .setNegativeAction(function() {
                  selectionMgr.enabled = true;
                  grabMgr.enabled = true;
                });
              builder.show();
            }
          })
        );

        groupPanel.getTagContainer = function() {
          return members;
        };
        groupPanel.add(label_capacity);
        tab3.add(groupPanel);
        groupPanels.push(groupPanel);
        groupPanel.org_height = groupPanel.h + 0;

        var finalH = Gheight;
        if (!no_anim || no_anim === undefined) {
          groupPanel.h = 0;
          Util.animate(null, Util.decelerateInterpolator, 300, function(frac) {
            groupPanels[groupPanels.length - 1].h = finalH * frac;
            groupPanels[groupPanels.length - 1].alpha = frac;
          });
        }
      };
      EditPage.removeGroup = function(index, no_anim) {
        L.i("removed table group", "table_map", 1365);
        if (!no_anim) {
          var orgH = groupPanels[index].h + 0;
          Util.animate(
            null,
            Util.decelerateInterpolator,
            300,
            function(frac) {
              groupPanels[index].h = orgH * (1 - frac);
              groupPanels[index].alpha = 1 - frac;
            },
            function() {
              g().splice(index, 1);
              tab3.remove(groupPanels[index]);
              groupPanels.splice(index, 1);
              for (var i = 0; i < groupPanels.length; i++) {
                groupPanels[i].elements[2].additionalinfo = i;
              }
              EditPage.paintneeded = true;
            }.bind(this)
          );
        } else {
          g().splice(index, 1);
          tab3.remove(groupPanels[index]);
          groupPanels.splice(index, 1);
          EditPage.paintneeded = true;
        }
      };
      var movedTable = false;
      var movedBlock = false;
      var movedMouseDown = false;
      var back_dialog_active = false;
      EditPage.onMouseMove = function(e) {
        movedMouseDown = Mouse.left_pressed;
        if (!movedTable && grabbingItem === "Table") {
          deltas.x = mouse.x - btnTable.x;
          deltas.y = mouse.y - btnTable.y;
          btnTable.hidden = false;
          btnTableTAB.hidden = true;
          btnTableTAB.release(true);
          btnTable.press();
          selectionMgr.enabled = false;
        }
        if (grabbingItem === "Table") {
          movedTable = true;
          EditPage.paintneeded = true;
          btnTable.x = mouse.x - deltas.x;
          btnTable.y = mouse.y - deltas.y;
        }

        if (!movedBlock && grabbingItem === "Block") {
          deltas.x = mouse.x - btnBlock.x;
          deltas.y = mouse.y - btnBlock.y;
          btnBlock.hidden = false;
          btnBlockTAB.hidden = true;
          btnBlockTAB.release(true);
          btnBlock.press();
          selectionMgr.enabled = false;
        }
        if (grabbingItem === "Block") {
          movedBlock = true;
          EditPage.paintneeded = true;
          btnBlock.x = mouse.x - deltas.x;
          btnBlock.y = mouse.y - deltas.y;
        }
      };
      EditPage.onKeyPress = function(e) {
        if (EditPage.active) {
          // 8 - backspace (MAC)
          //48 - delete    (WINDOWS)
          if (e.keyCode === 8 || e.keyCode === 46) {
            e.preventDefault();
            if (!CanvasElementManager.isInputFocused()) {
              removeSelectedItems();
            }
          }
          //27 - escape
          else if (e.keyCode === 27 && !back_dialog_active) {
            selectionMgr.enabled = false;
            grabMgr.enabled = false;
            back_dialog_active = true;
            new CanvasElements.Dialog.Builder()
              .setIcon(String.fromCharCode(59527))
              .setMessage(tm_strings[lang]["dialog_discard"])
              .setPositiveButton(tm_strings[lang]["dialog_action_discard"])
              .setNegativeButton(tm_strings[lang]["dialog_cancel"])
              .setNegativeAction(function(result) {
                selectionMgr.enabled = true;
                grabMgr.enabled = true;
                back_dialog_active = false;
              })
              .setPositiveAction(function(result) {
                PageManager.goBack();
                selectionMgr.enabled = true;
                grabMgr.enabled = true;
                back_dialog_active = false;
              })
              .ignoreFirstEvent()
              .show();
          }
        }
      };
      EditPage.onMouseUp = function(e) {
        //right click
        if (e.button === 2) {
          if (selectionMgr.getFocusedItem() !== undefined) {
            context_menu.setType(ContextMenuType.EditModeItem);
          } else {
            context_menu.setType(ContextMenuType.EditMode);
          }
          context_menu.show();
        }
      };
      function removeSelectedItems(consent_dialog) {
        if (consent_dialog) {
          if (selectionMgr.selected_object_indeces.length < 1) {
            Toast.show(
              tm_strings[lang]["toast_nothing_to_delete"],
              Toast.LENGTH_SHORT
            );
            return;
          }
          //dialog here
          selectionMgr.enabled = false;
          grabMgr.enabled = false;
          new CanvasElements.Dialog.Builder()
            .setIcon(String.fromCharCode(59527))
            .setMessage(tm_strings[lang]["dialog_remove_items"])
            .setPositiveButton(tm_strings[lang]["dialog_action_remove"])
            .setNegativeButton(tm_strings[lang]["dialog_cancel"])
            .setNegativeAction(function(result) {
              selectionMgr.enabled = true;
              grabMgr.enabled = true;
            })
            .setPositiveAction(function(result) {
              removeImpl();
              selectionMgr.enabled = true;
              grabMgr.enabled = true;
            })
            .show();
        } else removeImpl();

        function removeImpl() {
          //remove selected items
          var t = selectionMgr.selected_object_indeces;
          var t2 = selectionMgr.managed_objects;
          var l = selectionMgr.managed_objects.length + 0;
          selectionMgr.removeAllSelections();
          selectionMgr.managed_objects = [];
          selectionMgr.selected_object_indeces = [];
          EditPage.tablemap.getActiveFloor().items = [];
          var one_exists = false;
          for (var i = 0; i < l; i++) {
            if (t.indexOf(i) === -1) {
              var obj = t2[i];
              obj.selection_index = selectionMgr.managed_objects.length;
              selectionMgr.managed_objects.push(obj);
              EditPage.tablemap.getActiveFloor().items.push(obj);
              one_exists = true;
            } else {
              var obj = t2[i];
              var int = parseInt(obj.ID) - 1;
              item_ids[int] = undefined;
            }
          }
          grabMgr.initialize(selectionMgr, map_canvas_id);
          EditPage.paintneeded = true;
          if (!one_exists) EditPage.toggleTab(0);
        }
      }
      function getFocusedItem() {
        var item =
          selectionMgr.managed_objects[selectionMgr.focused_object_index];
        if (item === undefined) return {};
        else return item;
      }
    };

    /* Settings page initialization */
    SettingsPage.initialize = function() {
      SettingsPage.initialized = true;
      var manager = new CanvasElementManager(canvas);
      var panel = new CanvasElements.Panel({
        x: 300,
        y: 500,
        w: 300,
        h: 300,
        type: PanelType.Card,
        backcolor: "#FFF"
      });
      panel.add(
        new CanvasElements.Label({
          x: 0,
          y: 0,
          w: 300,
          h: 300,
          text: "This is a test of the settings page. Kecske.",
          font: "24px Roboto"
        })
      );
      manager.add(panel);
      manager.add(this.toolbar);
      manager.disable();

      SettingsPage.deactivate = function() {
        manager.disable();
        SettingsPage.active = false;
      };
      SettingsPage.activate = function() {
        manager.enable();
        SettingsPage.active = true;
      };
      SettingsPage.paint_needed = function() {
        return manager.paint_needed && SettingsPage.active;
      };
      SettingsPage.paint = function() {
        manager.paint();
      };
    };

    /* Error page initialization */
    ErrorPage.initialize = function() {
      ErrorPage.initialized = true;
      var manager = new CanvasElementManager(canvas);
      ErrorPage.toolbar = new CanvasElements.Panel({
        x: 0,
        y: 0,
        w: 0,
        h: dimen_toolbar_height,
        type: PanelType.Card,
        backcolor: color_toolbar,
        corner: 0
      });
      manager.add(ErrorPage.toolbar);
      manager.disable();

      ErrorPage.deactivate = function() {
        manager.disable();
        ErrorPage.active = false;
      };
      ErrorPage.activate = function() {
        manager.enable();
        ErrorPage.active = true;
      };
      ErrorPage.paint_needed = function() {
        return manager.paint_needed && ErrorPage.active;
      };
      ErrorPage.paint = function() {
        manager.paint();
        ErrorPage.paintneeded = false;
      };
    };

    var tableMap = new TableMap();
    // PageManager.downloadMap = function () {
    //     tableMap.onEmptyMap = function () {
    //         PageManager.selectPage(NoTableMapPage, Pages.NoTableMap);
    //         PageManager.manager.enabled = false;
    //     };
    //     tableMap.onDownloadedMap = function () {
    //         PageManager.selectPage(MainPage, Pages.Main);
    //         PageManager.manager.enabled = false;
    //     };
    //     tableMap.onErrorMap = function () {
    //         PageManager.selectPage(ErrorPage, Pages.Error);
    //     };
    //     tableMap.get();
    // };
    // PageManager.downloadMap();

    PageManager.animating = false;
    PageManager.fade = 0;
    PageManager.paint_needed = function() {
      return (
        NoTableMapPage.paint_needed() ||
        EditPage.paint_needed() ||
        MainPage.paint_needed() ||
        SettingsPage.paint_needed() ||
        PageManager.manager.paint_needed
      );
    };
    PageManager.paint = function() {
      NoTableMapPage.toolbar.w = canvas.scaledWidth;
      MainPage.toolbar.w = canvas.scaledWidth;
      EditPage.toolbar.w = canvas.scaledWidth;
      SettingsPage.toolbar.w = canvas.scaledWidth;
      ErrorPage.toolbar.w = canvas.scaledWidth;
      if (NoTableMapPage.active) NoTableMapPage.paint();
      if (MainPage.active) MainPage.paint();
      if (EditPage.active) EditPage.paint();
      if (SettingsPage.active) SettingsPage.paint();
      if (ErrorPage.active) ErrorPage.paint();

      if (PageManager.fade !== 0) {
        ctx.fillStyle = color_background;
        ctx.globalAlpha = PageManager.fade;
        ctx.fillRect(
          0,
          dimen_toolbar_height,
          canvas.scaledWidth,
          canvas.scaledHeight - dimen_toolbar_height
        );
        ctx.fillStyle = color_toolbar;
        Util.shadow(
          ctx,
          dimen_toolbar_elevation,
          function() {
            ctx.fillRect(0, 0, canvas.scaledWidth, dimen_toolbar_height);
          },
          PageManager.fade
        );
        ctx.globalAlpha = 1;
      }

      PageManager.manager.paint();
    };
    PageManager.selectPage = function(page, page_id) {
      page_stack.push(page_id);
      if (!page.initialized) page.initialize();
      page.activate();
      page.tablemap = tableMap;
      PageManager.current_page = page_id;
    };
    PageManager.getActivePage = function() {
      return parsePage(PageManager.current_page);
    };
    var page_stack = [];
    PageManager.navigate = function(page_id, pending_dialog, no_stack) {
      if (!no_stack) page_stack.push(page_id);
      var page_from = parsePage(PageManager.current_page);
      var page_to = parsePage(page_id);
      if (!page_to.initialized) page_to.initialize();

      if (pending_dialog) {
        page_to.activate();
        page_from.deactivate();
        PageManager.fade = 0;
        PageManager.current_page = page_id;
      } else {
        Util.animate(
          null,
          Util.linearInterpolator,
          600,
          function(frac) {
            PageManager.fade = 1 - 2 * Math.abs(frac - 0.5);
            if (frac > 0.5) {
              page_to.activate();
              page_from.deactivate();
            }
            PageManager.animating = true;
          },
          function() {
            PageManager.animating = false;
            PageManager.fade = 0;
            PageManager.current_page = page_id;
          }
        );
      }
    };
    PageManager.goBack = function() {
      if (page_stack.length < 2) {
        Toast.show(tm_strings[lang]["toast_no_navigation"], Toast.LENGTH_SHORT);
        return;
      }
      PageManager.navigate(page_stack[page_stack.length - 2], undefined, true);
      page_stack.splice(page_stack.length - 1, 1);
    };
    function parsePage(page_id) {
      switch (page_id) {
        case Pages.Main:
          return MainPage;
        case Pages.NoTableMap:
          return NoTableMapPage;
        case Pages.Edit:
          return EditPage;
        case Pages.Settings:
          return SettingsPage;
        case Pages.Error:
          return ErrorPage;
      }
    }

    //TEMPORARY CODE FOR MORE EFFICIENT DEVELOPMENT
    //NOTE: this should be removed when pushed to master or is uploaded to the production server
    tableMap.state = TableMapState.Downloaded;
    tableMap.privacy = PrivacyLevel.Public;
    tableMap.floors.push(new TableMap.Floor());
    MainPage.upload = true;
    MainPage.tablemap = tableMap;
    PageManager.selectPage(MainPage, Pages.Main);
    PageManager.manager.enabled = false;
    MainPage.checkIn();
    //END TEMP CODE
  };
  PageManager.paint_needed = function() {};
  PageManager.paint = function() {};

  function ContextMenu(items) {
    this.items = items;

    this.x = 0;
    this.y = 0;
    this.w = dimen_context_item_width;
    this.h = 0;
    this.opacity = 0;
    this.state = "hidden";
    this.itemhovered = false;
    this.subcontextactive = false;
    this.callbacks = [];
    this.hoveritemindex = 0;

    this.paint = function() {
      if (this.state !== "hidden") {
        this.h = 0;
        for (var i = 0; i < this.items.length; i++) this.h += this.items[i].h;
        var alpha = value_shadow_alpha * this.opacity;
        ctx.fillStyle = "rgba(255, 255, 255, " + this.opacity + ")";
        ctx.beginPath();
        ctx.rect(
          this.x,
          this.y - dimen_context_menu_top_bottom_padding,
          this.w,
          this.h + 2 * dimen_context_menu_top_bottom_padding
        );
        ctx.shadowColor = "rgba(0, 0, 0, " + alpha + ")";
        ctx.shadowBlur = 20;
        ctx.closePath();
        ctx.fill();
        ctx.shadowColor = "rgba(0, 0, 0, 0)";
        ctx.shadowBlur = 0;
        this.refH = 0;
        this.itemhovered = false;
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].paint(this);
        }
      }
    };
    this.update = function() {
      if (this.state !== "hidden") {
        var previndex = this.hoveritemindex;
        this.itemhovered = false;
        var alreadyset = false;
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].update(this);
          if (this.itemhovered && !alreadyset) {
            this.hoveritemindex = i;
            alreadyset = true;
          }
        }
        if (previndex !== this.hoveritemindex) paint();
      }
    };
    this.rightClickUp = function() {
      //this.show(mouse.x, mouse.y);
    };
    this.leftClickDown = function() {
      if (
        !intersectsMouse(
          this.x,
          this.y - dimen_context_menu_top_bottom_padding,
          this.w,
          this.h + 2 * dimen_context_menu_top_bottom_padding
        )
      ) {
        this.hide();
      }
      if (this.state !== "hidden") {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].leftClickDown();
        }
      }
    };
    this.leftClickUp = function() {
      if (
        intersectsMouse(
          this.x,
          this.y - dimen_context_menu_top_bottom_padding,
          this.w,
          this.h + 2 * dimen_context_menu_top_bottom_padding
        )
      ) {
        if (this.itemhovered) this.hide();
      }
      if (this.state !== "hidden") {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].leftClickUp();
        }
      }
    };
    this.setposition = function(x, y, width, xoffs) {
      if (width === undefined) width = 0;
      if (xoffs === undefined) xoffs = 0;
      var offsetX = 0;
      var offsetY = 0;
      if (x + this.w > canvas.scaledWidth)
        offsetX = canvas.scaledWidth - (x + this.w) - width - xoffs;
      if (y + this.h > canvas.scaledHeight)
        offsetY = canvas.scaledHeight - (y + this.h);
      this.x = x + offsetX;
      this.y = y + offsetY;
    };
    this.show = function(x, y, width, xoffs) {
      if (this.state === "hidden") {
        globalState = "context-menu";
        this.state = "onshow";
        this.setposition(x, y, width, xoffs);
        var timer = null;
        Util.animate(
          timer,
          Util.linearInterpolator,
          time_context_menu_fade,
          function(frac) {
            this.opacity = frac;
          }.bind(this),
          function() {
            this.state = "shown";
          }.bind(this)
        );
      } else {
        var timer = null;
        this.state === "onhide";
        this.closeSubContextMenus();
        Util.animate(
          timer,
          Util.linearInterpolator,
          time_context_menu_fade,
          function(frac) {
            this.opacity = 1 - frac;
          }.bind(this),
          function() {
            this.setposition(mouse.x, mouse.y);
            this.state === "onshow";
            var timer2 = null;
            Util.animate(
              timer2,
              Util.linearInterpolator,
              time_context_menu_fade,
              function(frac) {
                this.opacity = frac;
              }.bind(this),
              function() {
                this.state === "shown";
              }.bind(this)
            );
          }.bind(this)
        );
      }
    };
    this.hide = function() {
      if (this.state === "hidden" || this.state === "onhide") return;
      for (var i = 0; i < this.callbacks.length; i++) {
        this.callbacks[i]();
      }
      this.closeSubContextMenus();
      var timer = null;
      this.state = "onhide";
      globalState = "none";
      $(document.body).css("cursor", "default");
      Util.animate(
        timer,
        Util.linearInterpolator,
        time_context_menu_fade,
        function(frac) {
          this.opacity = 1 - frac;
        }.bind(this),
        function() {
          this.setHidden();
        }.bind(this)
      );
    };
    this.setHidden = function() {
      this.state = "hidden";
      for (var i = 0; i < this.items.length; i++) {
        this.items[i].setHidden();
      }
    };
    this.closeSubContextMenus = function() {
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].subcontextmenu !== undefined) {
          if (
            this.items[i].subcontextmenu.state !== "hidden" &&
            this.items[i].subcontextmenu.state !== "onhide"
          )
            this.items[i].subcontextmenu.hide();
          this.items[i].locked = false;
        }
      }
    };
    this.onHide = function(func) {
      this.callbacks.push(func);
    };
    this.setType = function(contextMenuType) {
      switch (contextMenuType) {
        case ContextMenuType.EditMode:
          var viewitems = [];
          viewitems[0] = new ContextMenuItem(
            String.fromCharCode(59647),
            "Zoom in",
            "Ctrl +"
          );
          viewitems[1] = new ContextMenuItem(
            String.fromCharCode(59648),
            "Zoom out",
            "Ctrl -"
          );
          viewitems[2] = new ContextMenuItem(
            String.fromCharCode(59551),
            "Pan",
            "Middle click"
          );
          viewitems[3] = new ContextMenuItem(
            String.fromCharCode(59491),
            "Rotate"
          );
          viewitems[4] = new ContextMenuItem(
            String.fromCharCode(58832),
            "Full screen",
            "F11"
          );
          var viewContextMenu = new ContextMenu(viewitems);

          this.items = [];
          this.items[0] = new ContextMenuItem(
            String.fromCharCode(59576),
            "Settings",
            "S"
          );
          this.items[1] = new ContextMenuItem(
            String.fromCharCode(57697),
            "Save",
            "Ctrl + S"
          );
          this.items[2] = new ContextMenuItem(
            String.fromCharCode(57676),
            "Exit",
            "Esc"
          );
          this.items[2].onclick = function() {
            EditPage.tablemap = PageManager.getActivePage().tablemap;
            PageManager.navigate(Pages.Edit);
          };
          this.items[3] = new ContextMenuSeparator();
          this.items[4] = new ContextMenuItem(
            String.fromCharCode(59542),
            "View",
            "",
            viewContextMenu
          );
          break;
        case ContextMenuType.EditModeItem:
          this.items = [];
          this.items[0] = new ContextMenuItem(
            String.fromCharCode(59576),
            "Properties"
          );
          this.items[1] = new ContextMenuItem(
            String.fromCharCode(59506),
            "Remove",
            "Del"
          );
          break;
        case ContextMenuType.NormalMode:
          var viewitems = [];
          viewitems[0] = new ContextMenuItem(
            String.fromCharCode(59538),
            "Item 1",
            "Ctrl + 1"
          );
          viewitems[1] = new ContextMenuItem(
            String.fromCharCode(59538),
            "Item 2",
            "Ctrl + 2"
          );
          viewitems[2] = new ContextMenuItem(
            String.fromCharCode(59538),
            "Item 3",
            "Ctrl + 3"
          );
          var viewSubContextMenu = new ContextMenu(viewitems);

          viewitems = [];
          viewitems[0] = new ContextMenuItem(
            String.fromCharCode(59647),
            "Zoom in",
            "Ctrl +"
          );
          viewitems[1] = new ContextMenuItem(
            String.fromCharCode(59648),
            "Zoom out",
            "Ctrl -"
          );
          viewitems[2] = new ContextMenuItem(
            String.fromCharCode(59551),
            "Pan",
            "Middle click"
          );
          viewitems[3] = new ContextMenuItem(
            String.fromCharCode(59491),
            "Rotate"
          );
          viewitems[4] = new ContextMenuItem(
            String.fromCharCode(58832),
            "Full screen",
            "F11"
          );
          var viewContextMenu = new ContextMenu(viewitems);

          this.items = [];
          this.items[0] = new ContextMenuItem(
            String.fromCharCode(59576),
            "Settings",
            "S"
          );
          this.items[1] = new ContextMenuItem(
            String.fromCharCode(58826),
            "Check in",
            "C"
          );
          this.items[2] = new ContextMenuItem(
            String.fromCharCode(57680),
            "Edit",
            "Ctrl + E"
          );
          this.items[2].onclick = function() {
            EditPage.tablemap = PageManager.getActivePage().tablemap;
            PageManager.navigate(Pages.Edit);
          };
          this.items[3] = new ContextMenuItem(
            String.fromCharCode(59621),
            "Statistics"
          );
          this.items[4] = new ContextMenuSeparator();
          this.items[5] = new ContextMenuItem(
            String.fromCharCode(59542),
            "View",
            "",
            viewContextMenu
          );
          break;
      }
    };

    var self = this;
    if (this.items !== undefined) {
      for (var i = 0; i < this.items.length; i++) {
        this.items[i].contextparent = self;
      }
    }
  }
  function ContextMenuItem(icon, text, hint, subcontextmenu) {
    this.icon = icon;
    this.text = text;
    this.hint = hint === undefined ? "" : hint;
    this.subcontextmenu = subcontextmenu;
    this.x = 0;
    this.y = 0;
    this.w = dimen_context_item_width;
    this.h = dimen_context_item_height;
    this.locked = false;
    this.backAlpha = 0;

    var offsetY_icon = 0;
    var offsetY_text = -2;
    this.unlockpending = false;
    this.paint = function(parent) {
      this.contextparent = parent;
      this.x = parent.x;
      this.y = parent.refH + parent.y;

      ctx.globalAlpha = this.backAlpha;
      ctx.fillStyle = Colors.black;
      ctx.fillRect(this.x, this.y, this.w, this.h);

      ctx.fillStyle = Colors.black;
      ctx.globalAlpha = 0.54 * parent.opacity;
      ctx.font = dimen_context_icon_size + "px Material Icons";
      ctx.fillText(
        this.icon,
        parent.x + dimen_context_item_padding,
        parent.refH +
          parent.y +
          this.h / 2 +
          dimen_context_icon_size / 2 +
          offsetY_icon
      );
      ctx.font =
        dimen_context_text_size + "px " + (NO_CACHE ? "sans-serif" : "Roboto");
      ctx.globalAlpha = 0.87 * parent.opacity;
      ctx.fillText(
        this.text,
        parent.x + dimen_context_item_text_padding,
        parent.refH +
          parent.y +
          this.h / 2 +
          dimen_context_text_size / 2 +
          offsetY_text
      );
      ctx.font =
        dimen_context_text_secondary_size +
        "px " +
        (NO_CACHE ? "sans-serif" : "Roboto");
      ctx.globalAlpha = 0.54 * parent.opacity;
      ctx.fillText(
        this.hint,
        parent.x +
          this.w -
          dimen_context_item_padding -
          ctx.measureText(this.hint).width,
        parent.refH +
          parent.y +
          this.h / 2 +
          dimen_context_text_secondary_size / 2 +
          offsetY_text
      );
      ctx.font = dimen_context_icon_size + "px Material Icons";
      ctx.fillText(
        this.subcontextmenu === undefined ? "" : icon_arrow_right,
        parent.x +
          this.w -
          dimen_context_item_padding -
          dimen_context_item_padding_arrow_right,
        parent.refH +
          parent.y +
          this.h / 2 +
          dimen_context_icon_size / 2 +
          offsetY_icon
      );
      ctx.globalAlpha = 1;
      parent.refH += this.h;

      if (this.subcontextmenu !== undefined) this.subcontextmenu.paint();
    };
    this.update = function(parent) {
      this.contextparent = parent;
      if (this.locked) {
        parent.itemhovered = true;
        this.backAlpha = (Mouse.left_pressed ? 0.16 : 0.08) * parent.opacity;
        if (intersectsMouse(this.x, this.y, this.w, this.h))
          $(document.body).css("cursor", "pointer");
      } else {
        if (intersectsMouse(this.x, this.y, this.w, this.h)) {
          parent.itemhovered = true;
          this.backAlpha = (Mouse.left_pressed ? 0.16 : 0.08) * parent.opacity;
          if (parent.state !== "onhide")
            $(document.body).css("cursor", "pointer");
          parent.closeSubContextMenus();
          if (
            this.subcontextmenu !== undefined &&
            this.subcontextmenu.state === "hidden"
          ) {
            this.subcontextmenu.show(
              this.x + this.w,
              this.y,
              dimen_context_item_width,
              canvas.scaledWidth - (this.x + this.w)
            );
            this.locked = true;
          }
        } else {
          this.backAlpha = 0;
          parent.itemhovered = false || parent.itemhovered;
          if (!parent.itemhovered) $(document.body).css("cursor", "default");
        }
      }
      if (this.subcontextmenu !== undefined) this.subcontextmenu.update();
    };
    this.leftClickDown = function() {
      if (intersectsMouse(this.x, this.y, this.w, this.h)) {
        if (
          this.onclick !== undefined &&
          this.contextparent.state === "shown"
        ) {
          this.onclick();
        }
      }
      if (this.subcontextmenu === undefined) return;
      if (
        !this.locked &&
        !intersectsMouse(
          this.subcontextmenu.x,
          this.subcontextmenu.y - dimen_context_menu_top_bottom_padding,
          this.subcontextmenu.w,
          this.subcontextmenu.h + 2 * dimen_context_menu_top_bottom_padding
        )
      ) {
        this.subcontextmenu.hide();
      }
    };
    this.leftClickUp = function() {
      if (this.subcontextmenu === undefined) return;
      if (
        !this.locked &&
        intersectsMouse(
          this.subcontextmenu.x,
          this.subcontextmenu.y - dimen_context_menu_top_bottom_padding,
          this.subcontextmenu.w,
          this.subcontextmenu.h + 2 * dimen_context_menu_top_bottom_padding
        )
      ) {
        if (this.subcontextmenu.itemhovered) this.subcontextmenu.hide();
      }
    };
    this.setHidden = function() {
      if (this.subcontextmenu === undefined) return;
      this.subcontextmenu.setHidden();
    };
  }
  function ContextMenuSeparator() {
    this.w = 0;
    this.h = dimen_context_separator_height;
    this.paint = function(parent) {
      ctx.fillStyle = Colors.black;
      ctx.globalAlpha = 0.12 * parent.opacity;
      ctx.fillRect(
        parent.x,
        parent.refH + parent.y + this.h / 2,
        dimen_context_item_width,
        1
      );
      parent.refH += this.h;
    };
    this.update = function() {};
    this.leftClickDown = function() {};
    this.leftClickUp = function() {};
    this.setHidden = function() {};
  }

  function intersectsMouse(x, y, w, h) {
    return mouse.x <= x + w && mouse.x > x && mouse.y <= y + h && mouse.y > y;
  }

  TableMapClient.paint = function() {
    paint();
  };
};

/*
 * Client model class based on the model in AppEngine server. (TableMap.java)
 *
 * Dependencies
 * [tabletapp.js] gapi
 * [tabletapp.js] showDialog()
 * [canvas_elements.js] CanvasElementManager
 */
var drawFont = NO_CACHE ? "12px sans-serif" : "12px Roboto";
var TableMap = function() {
  this.ID;
  this.table_capacity_count = 0;
  this.floors = [];
  this.privacy = PrivacyLevel.Private;
  this.mode = Pages.Main;
  this.reservations = [];

  //client variables (not fetched from server)
  this.state = TableMapState.Loading;
  this.onEmptyMap = function() {};
  this.onDownloadedMap = function() {};
  this.onErrorMap = function() {};
  this.active_floor_index = 0;
  this.getActiveFloor = function() {
    return this.floors[this.active_floor_index];
  };

  TableMap.Floor = function() {
    this.size_x = 0;
    this.size_y = 0;
    //public
    this.items = [];
    this.table_groups = [];
  };
  TableMap.Item = function() {
    this.ID;
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.z = 0;
    this.type = "";
    this.subtype = "";
    this.prevshape = new TableMap.MapItemShape();
    this.shape = new TableMap.MapItemShape();
    this.tags = [];
    this.attributes = [];
    //NEW
    this.label = "";
    this.rotation = 0;

    this.table_capacity = 4;
    this.reserved = false;

    //intefaces
    this.reservable = true;
    this.occupyable = true;
    this.labelable = true;
    this.movable = true;
    this.editable = true;
    this.resizable = true;
    this.joinable = false;
  };
  TableMap.Group = function() {
    this.ID;
    //NEW
    this.label = "";

    this.item_ids = [];
    this.reserved = false;
    this.table_capacity = 0;
  };
  TableMap.MapItemShape = function() {
    this.rounded = false;
    this.rounded_full = false;
    this.relative_roundness = 0;
    this.type = MapItemShapeType["server"][0];
  };

  this.upload = function() {
    this.attributes = [];
    this.attributes[0] = "new";
    if (gapi === undefined) {
      Util.showDialog(
        DialogType.NoInternet,
        function() {
          this.upload();
        }.bind(this)
      );
    } else {
      var map = this;
      if (!isset(currentSession)) {
        Util.showDialog(
          DialogType.NotLoggedIn,
          function() {
            this.upload();
          }.bind(this)
        );
        return null;
      }
      Util.showDialog(DialogType.Loading);
      gapi.client.databaseService.tablemap
        .add({ session_id: currentSession.ID, resource: map })
        .execute(function(resp) {
          if (resp.error !== undefined) {
            if (resp.error.code === -1)
              Util.showDialog(
                DialogType.NoInternet,
                function() {
                  this.upload();
                }.bind(this)
              );
            else {
              new CanvasElements.Dialog.Builder()
                .setPositiveButton(tm_strings[lang]["dialog_ok"])
                .setNegativeButton(tm_strings[lang]["dialog_retry"])
                .setTitle("Error " + resp.error.code)
                .setMessage(resp.error.data[0].message)
                .setIcon(String.fromCharCode(59534))
                .setNegativeAction(
                  function() {
                    this.upload();
                  }.bind(this)
                )
                .show();
            }
          } else {
            new CanvasElements.Dialog.Builder()
              .setPositiveButton(tm_strings[lang]["dialog_ok"])
              .setMessage(tm_strings[lang]["dialog_upload_success"])
              .setIcon(String.fromCharCode(59534))
              .show();
            //alert("Upload successful.");
          }
        });
    }
  };
  this.get = function() {
    if (gapi === undefined) {
      Util.showDialog(
        DialogType.NoInternet,
        function() {
          this.get();
        }.bind(this)
      );
      this.state = TableMapState.Empty;
    } else {
      if (!isset(currentSession)) {
        Util.showDialog(
          DialogType.NotLoggedIn,
          function() {
            this.get();
          }.bind(this)
        );
        return null;
      }
      Util.showDialog(DialogType.Loading);
      this.state = TableMapState.Loading;
      gapi.client.databaseService.tablemap
        .get({ session_id: currentSession.ID })
        .execute(
          function(resp) {
            if (resp.error !== undefined) {
              if (resp.error.code === -1)
                Util.showDialog(
                  DialogType.NoInternet,
                  function() {
                    this.get();
                  }.bind(this)
                );
              else {
                this.error(
                  resp.error,
                  function() {
                    this.get();
                  }.bind(this)
                );
              }
              if (currentRestaurant !== null) {
                if (currentRestaurant.table_map_id === 0) {
                  this.state = TableMapState.Empty;
                } else this.state = TableMapState.Error;
              } else this.state = TableMapState.Error;
            } else {
              Util.cancelDialog();
              if (resp.ID === undefined) {
                this.state = TableMapState.Empty;
              } else {
                this.state = TableMapState.Downloaded;
                this.ID = resp.ID;
                this.table_capacity_count = resp.table_capacity_count;
                this.floors = resp.floors;
                this.privacy = resp.privacy;
              }
            }

            switch (this.state) {
              case TableMapState.Downloaded:
                L.i("TableMap downloaded succesfully.", "table_map", 1027);
                this.onDownloadedMap();
                break;
              case TableMapState.Empty:
                L.w("TableMap is empty.", "table_map", 1031);
                this.onEmptyMap();
                break;
              case TableMapState.Error:
                L.e("TableMap error while downloading.", "table_map", 1036);
                this.onErrorMap();
                break;
            }
          }.bind(this)
        );
    }
    switch (this.state) {
      case TableMapState.Downloaded:
        L.i("TableMap downloaded succesfully.", "table_map", 1027);
        this.onDownloadedMap();
        break;
      case TableMapState.Empty:
        L.w("TableMap is empty.", "table_map", 1031);
        this.onEmptyMap();
        break;
      case TableMapState.Error:
        L.e("TableMap error while downloading.", "table_map", 1036);
        this.onErrorMap();
        break;
    }
  };
  this.update = function() {
    if (gapi === undefined) {
      Util.showDialog(
        DialogType.NoInternet,
        function() {
          this.update();
        }.bind(this)
      );
    } else {
      var map = this;
      if (!isset(currentSession)) {
        Util.showDialog(
          DialogType.NotLoggedIn,
          function() {
            this.update();
          }.bind(this)
        );
        return null;
      }
      Util.showDialog(DialogType.Loading);
      gapi.client.databaseService.tablemap
        .patch({ session_id: currentSession.ID, resource: map })
        .execute(function(resp) {
          if (resp.error !== undefined) {
            if (resp.error.code === -1)
              Util.showDialog(
                DialogType.NoInternet,
                function() {
                  this.update();
                }.bind(this)
              );
            else {
              this.error(
                resp.error,
                function() {
                  this.update();
                }.bind(this)
              );
            }
          } else {
            new CanvasElements.Dialog.Builder()
              .setPositiveButton(tm_strings[lang]["dialog_ok"])
              .setMessage(tm_strings[lang]["dialog_update_success"])
              .setIcon(String.fromCharCode(59534))
              .show();
          }
        });
    }
  };
  this.remove = function(callback) {
    if (gapi === undefined) {
      Util.showDialog(
        DialogType.NoInternet,
        function() {
          this.remove();
        }.bind(this)
      );
    } else {
      if (!isset(currentSession)) {
        Util.showDialog(
          DialogType.NotLoggedIn,
          function() {
            this.remove();
          }.bind(this)
        );
        return null;
      }
      Util.showDialog(DialogType.Loading);
      gapi.client.databaseService.tablemap
        .remove({ session_id: currentSession.ID })
        .execute(function(resp) {
          if (resp.error !== undefined) {
            if (resp.error.code === -1)
              Util.showDialog(
                DialogType.NoInternet,
                function() {
                  this.update();
                }.bind(this)
              );
            else {
              this.error(
                resp.error,
                function() {
                  this.remove();
                }.bind(this)
              );
            }
          } else {
            if (callback !== undefined) callback();
            new CanvasElements.Dialog.Builder()
              .setPositiveButton(tm_strings[lang]["dialog_ok"])
              .setMessage(tm_strings[lang]["dialog_remove_success"])
              .setIcon(String.fromCharCode(59534))
              .show();
          }
        });
    }
  };
  this.paint = function(ctx) {
    switch (this.state) {
      case TableMapState.Downloaded:
        var floor = this.getActiveFloor();
        if (floor !== undefined) {
          for (var index = 0; index < floor.items.length; index++) {
            var item = floor.items[index];
            var center = { x: item.x + item.w / 2, y: item.y + item.h / 2 };

            //fill lines array
            var lines = [];
            lines.push(
              TableMapItemType[lang][
                TableMapItemType["server"].indexOf(item.type)
              ]
            );
            lines.push(item.ID);

            var textColor = Colors.black;
            var backColor = Colors.blue_400;
            switch (item.type) {
              case "Table":
                backColor = Colors.red_400;
                textColor = Colors.white;
                lines.push(tm_strings[lang]["capacity"] + item.table_capacity);
                break;
              default:
                backColor = Colors.grey_300;
                textColor = Colors.black;
                lines.push('"' + item.label + '"');
                break;
            }
            if (this.mode === Pages.Main) lines = [];

            var pts = [];
            ctx.beginPath();
            switch (item.shape.type) {
              case "Rectangle":
                pts.push({ x: item.x, y: item.y });
                pts.push({ x: item.x + item.w, y: item.y });
                pts.push({ x: item.x + item.w, y: item.y + item.h });
                pts.push({ x: item.x, y: item.y + item.h });
                //Util.roundRect(ctx, item.x, item.y, item.w, item.h, 3, false, false);
                break;
              case "Circle":
                var r = item.w < item.h ? item.w / 2 : item.h / 2;
                ctx.arc(
                  item.x + item.w / 2,
                  item.y + item.h / 2,
                  r,
                  0,
                  2 * Math.PI,
                  false
                );
                break;
              case "Hexagon":
                var p = 6;
                var r =
                  item.w <= item.h
                    ? item.w / 2
                    : item.h / 2 / Math.sin((Math.PI * (1 * (360 / p))) / 180);
                pts = [];
                for (var i = 0; i < p; i++) {
                  pts.push({
                    x:
                      center.x +
                      r * Math.cos((Math.PI * (i * (360 / p))) / 180),
                    y:
                      center.y - r * Math.sin((Math.PI * (i * (360 / p))) / 180)
                  });
                }
                Util.roundedShape(ctx, pts, 6, false, false);
                break;
              case "Octagon":
                var p = 8;
                var r = item.w <= item.h ? item.w / 2 : item.h / 2;
                pts = [];
                for (var i = 0; i < p; i++) {
                  pts.push({
                    x:
                      center.x +
                      r * Math.cos((Math.PI * (i * (360 / p))) / 180),
                    y:
                      center.y - r * Math.sin((Math.PI * (i * (360 / p))) / 180)
                  });
                }

                break;
              case "Ellipse":
                var d = Math.SQRT2 / 2.2;
                ctx.moveTo(center.x, item.y); // A1

                ctx.bezierCurveTo(
                  center.x + item.w * d,
                  item.y, // C1
                  center.x + item.w * d,
                  item.y + item.h, // C2
                  center.x,
                  item.y + item.h
                ); // A2

                ctx.bezierCurveTo(
                  center.x - item.w * d,
                  item.y + item.h, // C3
                  center.x - item.w * d,
                  item.y, // C4
                  center.x,
                  item.y
                ); // A1
                //ctx.arc(item.x + item.w / 2, item.y + item.h / 2, item.w, item.h, 0, 2 * Math.PI, false);
                break;
              case "Rhombus":
                pts.push({ x: center.x, y: item.y });
                pts.push({ x: item.x + item.w, y: center.y });
                pts.push({ x: center.x, y: item.y + item.h });
                pts.push({ x: item.x, y: center.y });
                break;
            }
            if (pts.length > 0)
              Util.roundedShape(
                ctx,
                pts,
                item.shape.type === "Rectangle" || item.shape.type === "Rhombus"
                  ? 4
                  : 6,
                false,
                false
              );
            ctx.closePath();
            ctx.globalAlpha = 1;
            ctx.fillStyle = backColor;
            ctx.fill();

            ctx.fillStyle = textColor;
            ctx.globalAlpha = 0.87;
            ctx.font = drawFont;
            var row_gap = 2;
            var font_size = 12;
            for (var i = 0; i < lines.length; i++) {
              var offset =
                (font_size + row_gap) * (i + 1 - lines.length / 2) -
                font_size / 2;
              ctx.fillText(
                lines[i],
                center.x - ctx.measureText(lines[i]).width / 2,
                center.y + offset
              );
            }

            floor.items[index].prevshape = $.extend(
              {},
              floor.items[index].shape
            );
          }
        }
        break;
      case TableMapState.Empty:
        ctx.font = drawFont;
        ctx.globalAlpha = 0.54;
        ctx.fillStyle = "black";
        ctx.fillText(
          tm_strings[lang]["no_table_map"],
          ctx.canvas.scaledWidth / 2 -
            ctx.measureText(tm_strings[lang]["no_table_map"]).width / 2,
          ctx.canvas.scaledHeight / 2
        );
        ctx.globalAlpha = 1;
        break;
      case TableMapState.Error:
        ctx.font = drawFont;
        ctx.globalAlpha = 0.54;
        ctx.fillStyle = "black";
        ctx.fillText(
          tm_strings[lang]["tablemap_error"],
          ctx.canvas.scaledWidth / 2 -
            ctx.measureText(tm_strings[lang]["tablemap_error"]).width / 2,
          ctx.canvas.scaledHeight / 2
        );
        ctx.globalAlpha = 1;
        break;
      case TableMapState.Loading:
        ctx.font = drawFont;
        ctx.globalAlpha = 0.54;
        ctx.fillStyle = "black";
        ctx.fillText(
          tm_strings[lang]["loading"],
          ctx.canvas.scaledWidth / 2 -
            ctx.measureText(tm_strings[lang]["loading"]).width / 2,
          ctx.canvas.scaledHeight / 2
        );
        ctx.globalAlpha = 1;
        break;
    }
  };
  this.error = function(error, action) {
    var REGEX_ERROR = /Error [0-9]{5} - ([a-z]|[A-Z]|[0-9]|:|.|,|!| )*/i;
    if (isset(error) && isset(action)) {
      var isClientError = REGEX_ERROR.test(error.data[0].message);
      var message = "";
      var code = 0;
      if (isClientError) {
        error.data[0].message = error.data[0].message.trim();
        code = Number.parseInt(error.data[0].message.substring(6, 6 + 5));
        message = error.data[0].message.substring(
          14,
          error.data[0].message.length
        );
        message = parseMessage(message, code);
      } else {
        message = tm_strings[lang]["tablemap_error"];
        code = error.code;
      }

      var positiveButton = tm_strings[lang]["dialog_ok"];
      var negativeButton = tm_strings[lang]["dialog_retry"];
      var positiveAction = function() {};
      var negativeAction = action;
      var cancelable = true;
      //custom CTA buttons
      switch (code) {
        case 52001:
          positiveButton = tm_strings[lang]["services"];
          positiveAction = function() {
            loadServices();
          };
          negativeButton = undefined;
          cancelable = false;
          break;
      }

      var builder = new CanvasElements.Dialog.Builder()
        .setPositiveButton(positiveButton)
        .setTitle("Error " + code)
        .setMessage(message)
        .setIcon(String.fromCharCode(59534))
        .setPositiveAction(positiveAction)
        .setCancelable(cancelable);
      if (isset(negativeButton)) {
        builder = builder.setNegativeAction(negativeAction);
        builder = builder.setNegativeButton(negativeButton);
      }
      builder.show();
    }
  };
  function parseMessage(message, code) {
    //POSSIBLE ERRORS
    //
    //50701	Unable to save TableMap to database.
    //50702	TableMap does not exist with this ID: [ID]
    //50703	Unable to delete TableMap from database.
    //50704	Unable to update, invalid TableMap entity.
    //50705	The IDs in this tablemap object conflict. ID: [ID]
    //50706	The item does not exist with this ID: [ID]
    //50707	There is no TableMap associated with this restaurant.
    //52001	This service is not enabled for this restaurant.
    //52199	Something went wrong at our end. Please send a bug report.
    //50301	Not authenticated on [IPADDR]
    //50302	Please register an account to continue.
    //50303	Please confirm your email address to continue.
    switch (lang) {
      case "en-US":
        if (code === 50301) return "Unable to login. Please try again.";
        else return message;
        break;
      case "hu-HU":
        switch (code) {
          case 52001:
            return "A szolgáltatás nincs engedélyezve ehhez az étteremhez.";
          case 52199:
            return "Valami hiba történt nálunk. Kérjük, hogy jelentsd a hibát.";
          case 50301:
            return "Nem sikerült bejelentkezni. Kérjük, próbáld újra.";
          case 50302:
            return "Kérjük, regisztrálj egy profilt a folytatáshoz.";
          case 50303:
            return "Kérjük, igazold vissza az e-mail címedet a folytatáshoz.";
          case 50701:
            return "Sikertelen mentés az adatbázisba.";
          case 50702:
            return (
              "A TableMap nem létezik ezzel az ID-vel: " +
              message.split(":")[1].trim()
            );
          case 50703:
            return "Sikertelen törlés az adatbázisból.";
          case 50704:
            return "Nem sikerült a mentés, érvénytelen TableMap.";
          case 50705:
            return (
              "Az ID-k ebben a TableMap-ben ütköznek. ID: " +
              message.split(":")[1].trim()
            );
          case 50706:
            return (
              "Az elem nem létezik ezzel az ID-vel: " +
              message.split(":")[1].trim()
            );
          case 50707:
            return "Nem létezik ezzel az étteremmel asszociált TableMap.";
        }
        break;
      default:
        return "This language is not supported.";
    }
  }
};

/**
 * Dependencies
 * [tabletapp.js] Mouse
 */
function Navigator() {
  document.addEventListener(
    "mousemove",
    function(evt) {
      mouse = this.input_transform(mouse);
      if (this.enabled) this.onMouseMove();
    }.bind(this),
    false
  );
  document.addEventListener(
    "mousedown",
    function(evt) {
      if (this.enabled) {
        if (evt.button === 0) this.onLeftMouseDown();
        if (evt.button === 1) this.onMiddleMouseDown();
      }
    }.bind(this),
    false
  );
  document.addEventListener(
    "mouseup",
    function(evt) {
      if (this.enabled) {
        if (evt.button === 0) this.onLeftMouseUp();
        if (evt.button === 1) this.onMiddleMouseUp();
      }
    }.bind(this),
    false
  );
  document.addEventListener(
    "keydown",
    function(evt) {
      evt.preventDefault();
      if (this.enabled) this.onKeyDown(evt);
    }.bind(this),
    false
  );
  document.addEventListener(
    "keyup",
    function(evt) {
      if (this.enabled) this.onKeyUp(evt);
    }.bind(this),
    false
  );
  document.addEventListener(
    "wheel",
    function(evt) {
      if (this.enabled) this.onScroll(evt);
    }.bind(this),
    false
  );
  this.enabled = true;
  this.dragging = false;
  this.offset_x = 0;
  this.offset_y = 0;
  this.zoom = 1;
  this.zoom_minimum = 0.2;
  this.zoom_maximum = 40;
  this.zoom_multiplier = 1 / 2.5;
  this.paint_needed = false;

  var space_pressed = false;
  var ctrl_pressed = false;
  var grabX = 0;
  var grabY = 0;
  var orgOffsetX = 0;
  var orgOffsetY = 0;
  var animTimer = null;
  var deltaZoom = 1;
  var prevDelta = 0;
  var prevDirection = 0;

  var mouse = Mouse;
  this.input_transform = function(m) {
    return m;
  };
  this.setInputTransform = function(transform) {
    this.input_transform = transform;
  };
  this.paint = function() {
    this.paint_needed = false;
  };
  this.onMouseMove = function() {
    if (this.dragging) {
      this.offset_x = orgOffsetX + (mouse.x - grabX);
      this.offset_y = orgOffsetY + (mouse.y - grabY);
      this.paint_needed = true;
    }
  };
  this.onKeyDown = function(evt) {
    if (!Mouse.left_pressed) {
      if (evt.keyCode === 32 && !space_pressed && globalState === "none") {
        $(document.body).css("cursor", "grab");
        $(document.body).css("cursor", "-webkit-grab");
        $(document.body).css("cursor", "-moz-grab");
        $(document.body).css("cursor", "-o-grab");
        $(document.body).css("cursor", "-ms-grab");
        globalState = "navigation-none";
        space_pressed = true;
        this.paint_needed = true;
      }
      if (evt.keyCode === 17) {
        ctrl_pressed = true;
        evt.preventDefault();
      }
    }
  };
  this.onKeyUp = function(evt) {
    if (evt.keyCode === 32) {
      this.release();
      $(document.body).css("cursor", "default");
      globalState = "none";
      space_pressed = false;
      this.paint_needed = true;
    }
    if (evt.keyCode === 17) {
      ctrl_pressed = false;
    }
    this.paint_needed = true;
  };
  this.onLeftMouseDown = function() {
    if (space_pressed && globalState === "navigation-none") {
      this.drag();
    }
  };
  this.onLeftMouseUp = function() {
    this.release();
  };
  this.onMiddleMouseDown = function() {
    this.drag();
  };
  this.onMiddleMouseUp = function() {
    this.release();
    $(document.body).css("cursor", "default");
    globalState = "none";
    space_pressed = false;
    this.paint_needed = true;
  };

  this.onScroll = function(evt) {
    if (ctrl_pressed || true) {
      if (animTimer !== null && !((prevDirection > 0) ^ (-evt.deltaY > 0))) {
        deltaZoom += -(evt.deltaY > 0 ? 1 : -1) * this.zoom_multiplier;
      } else {
        window.clearInterval(animTimer);
        deltaZoom += -(evt.deltaY > 0 ? 1 : -1) * this.zoom_multiplier;
        if (prevDelta !== deltaZoom > 0 ? 1 : -1) {
          deltaZoom = -(evt.deltaY > 0 ? 1 : -1) * this.zoom_multiplier;
        }
      }
      //trim
      deltaZoom =
        zoom + deltaZoom <= this.zoom_minimum
          ? -(zoom - this.zoom_minimum)
          : deltaZoom;
      deltaZoom =
        zoom + deltaZoom >= this.zoom_maximum
          ? -(zoom - this.zoom_maximum)
          : deltaZoom;

      var border = 1;
      //                var hardness = 1;
      //                var transform = Math.pow(0.5, 1/hardness);
      var factor =
        (zoom - this.zoom_minimum) / ((border - this.zoom_minimum) * 2);
      //                var multiplier_override = zoom <= border ? Math.pow(factor * transform, hardness) : 1;
      if (deltaZoom < 0) {
        deltaZoom *= zoom + deltaZoom < border ? 0.5 : 1;
      } else {
        deltaZoom *= zoom < border ? 0.25 : 1;
      }

      var zoomOrg = zoom;
      var zoomNew = zoom + deltaZoom;
      var offsetXOrg = this.offset_x;
      var offsetYOrg = this.offset_y;

      mouse.x -= this.offset_x;
      mouse.y -= this.offset_y;
      mouse.x /= zoom;
      mouse.y /= zoom;
      var offsetXDelta = -deltaZoom * mouse.x;
      var offsetYDelta = -deltaZoom * mouse.y;
      mouse.x *= zoom;
      mouse.y *= zoom;
      mouse.x += this.offset_x;
      mouse.y += this.offset_y;

      animTimer = Util.animate(
        animTimer,
        Util.decelerateInterpolator,
        600,
        function(frac) {
          zoom = zoomOrg + frac * deltaZoom;

          this.offset_x = offsetXOrg + frac * offsetXDelta;
          this.offset_y = offsetYOrg + frac * offsetYDelta;
        },
        function() {
          deltaZoom = 0;
          animTimer = null;
        }
      );

      //this.paint_needed = true;
      prevDelta = deltaZoom > 0 ? 1 : -1;
      prevDirection = -evt.deltaY;

      debugText1 = !((prevDirection > 0) ^ (-evt.deltaY > 0));
      debugText2 = deltaZoom;
    }
  };
  this.drag = function() {
    if (!this.dragging) {
      globalState = "navigation-drag";
      grabX = mouse.x;
      grabY = mouse.y;
      orgOffsetX = this.offset_x;
      orgOffsetY = this.offset_y;
      $(document.body).css("cursor", "grabbing");
      $(document.body).css("cursor", "-webkit-grabbing");
      $(document.body).css("cursor", "-moz-grabbing");
      $(document.body).css("cursor", "-o-grabbing");
      $(document.body).css("cursor", "-ms-grabbing");
      this.paint_needed = true;
    }
    this.dragging = true;
  };
  this.release = function() {
    if (this.dragging) {
      globalState = "navigation-none";
      $(document.body).css("cursor", "grab");
      $(document.body).css("cursor", "-webkit-grab");
      $(document.body).css("cursor", "-moz-grab");
      $(document.body).css("cursor", "-o-grab");
      $(document.body).css("cursor", "-ms-grab");
      this.paint_needed = true;
    }
    this.dragging = false;
  };
}

/**
 * IMPORTANT NOTE
 * This manager class assumes all objects managed throughout it have an x, y, w, h, corresponding
 * to the object's bounding box cordinates and dimensions.
 *
 * Dependencies
 * [tabletapp.js] Keyboard
 * [tabletapp.js] Mouse
 * [tabletapp.js] Colors
 */
var SelectionManager = function() {
  document.addEventListener(
    "mousemove",
    function(evt) {
      mouse.x = evt.clientX;
      mouse.y = evt.clientY;
      mouse = this.input_transform(mouse);
      if (drag_box) {
        if (mouse.x < this.constrain_box.x) mouse.x = this.constrain_box.x;
        if (mouse.y < this.constrain_box.y) mouse.y = this.constrain_box.y;
        if (mouse.x > this.constrain_box.x + this.constrain_box.w)
          mouse.x = this.constrain_box.x + this.constrain_box.w;
        if (mouse.y > this.constrain_box.y + this.constrain_box.h)
          mouse.x = this.constrain_box.y + this.constrain_box.h;
      }

      if (
        this.enabled &&
        intersectsMouse(
          this.constrain_box.x,
          this.constrain_box.y,
          this.constrain_box.w,
          this.constrain_box.h
        )
      )
        this.onMouseMove();
    }.bind(this),
    false
  );
  document.addEventListener(
    "mousedown",
    function(evt) {
      if (
        (evt.button === 0 || evt.button === 2) &&
        this.enabled &&
        intersectsMouse(
          this.constrain_box.x,
          this.constrain_box.y,
          this.constrain_box.w,
          this.constrain_box.h
        )
      ) {
        this.onMouseDown();
      }
    }.bind(this),
    false
  );
  document.addEventListener(
    "mouseup",
    function(evt) {
      if (
        ((evt.button === 0 || evt.button === 2) &&
          this.enabled &&
          intersectsMouse(
            this.constrain_box.x,
            this.constrain_box.y,
            this.constrain_box.w,
            this.constrain_box.h
          )) ||
        drag_box
      ) {
        this.onMouseUp();
      }
    }.bind(this),
    false
  );

  this.enabled = true;
  this.hidden = false;
  this.deselect_enabled = false;
  this.select_box_enabled = true;
  this.grabber_type = GrabberType.Circle;
  this.debug = false;
  this.paint_needed = false;
  this.focused_object_index = -1;
  this.selected_object_indeces = [];
  this.managed_objects = [];
  //graphic settings
  this.grabber_size = 8;
  this.color_selected = Colors.white;
  this.color_focused = Colors.grey_800;
  this.constrain_box = { x: 0, y: 0, w: 9999, h: 9999 };

  var pts = [];
  var obj;
  this.paint = function(ctx) {
    if (this.hidden) {
      this.paint_needed = false;
      return null;
    }
    //paint selection
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.87;
    ctx.strokeStyle = "black";
    for (var i = 0; i < this.selected_object_indeces.length; i++) {
      obj = {};
      obj = this.managed_objects[this.selected_object_indeces[i]];
      if (obj.selected) {
        pts = [];
        pts[0] = { x: obj.x, y: obj.y };
        pts[1] = { x: obj.x + obj.w, y: obj.y };
        pts[2] = { x: obj.x + obj.w, y: obj.y + obj.h };
        pts[3] = { x: obj.x, y: obj.y + obj.h };

        pts[4] = { x: obj.x + obj.w / 2, y: obj.y };
        pts[5] = { x: obj.x + obj.w, y: obj.y + obj.h / 2 };
        pts[6] = { x: obj.x + obj.w / 2, y: obj.y + obj.h };
        pts[7] = { x: obj.x, y: obj.y + obj.h / 2 };

        ctx.fillStyle = Colors.white;
        ctx.globalAlpha = 0.3;
        ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
        for (var j = 0; j < 8; j++) {
          ctx.globalAlpha = 1;
          ctx.fillStyle = obj.focused
            ? this.color_focused
            : this.color_selected;
          Util.shadow(
            ctx,
            1.5,
            function() {
              if (this.grabber_type === GrabberType.Box) {
                ctx.fillRect(
                  pts[j].x - this.grabber_size / 2,
                  pts[j].y - this.grabber_size / 2,
                  this.grabber_size,
                  this.grabber_size
                );
              }

              if (this.grabber_type === GrabberType.Circle) {
                //ctx.save();
                ctx.beginPath();
                ctx.arc(
                  pts[j].x,
                  pts[j].y,
                  this.grabber_size / 2,
                  0,
                  2 * Math.PI,
                  false
                );
                ctx.fill();
                ctx.closePath();
                //ctx.restore();
              }
            }.bind(this)
          );
        }
      }
    }
    ctx.shadowColor = "rgba(0, 0, 0, 0)";
    ctx.shadowBlur = 0;
    ctx.fillStyle = "black";
    ctx.globalAlpha = 1;
    if (this.debug) {
      ctx.fillText("shift: " + Keyboard.shift, 10, 20);
      ctx.fillText("focused obj: " + this.focused_object_index, 10, 30);
      ctx.fillText(
        "selected objs: " + this.selected_object_indeces.join(", "),
        10,
        40
      );
      ctx.fillText("drag box: " + drag_box, 10, 50);
      ctx.fillText(
        "org selected objs: " + originally_selected_array.join(", "),
        10,
        60
      );
      ctx.fillText("org focus: " + original_focus, 10, 70);
      ctx.fillText("selection enabled: " + this.enabled, 10, 80);
      ctx.fillText("deselect enabled: " + this.deselect_enabled, 10, 90);
      ctx.fillText("select box enabled: " + this.select_box_enabled, 10, 100);
      ctx.fillText(
        "pending remove all selection: " + pending_remove_all_selection,
        10,
        110
      );
    }
    //paint selection box if present
    if (drag_box && this.select_box_enabled) {
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = Colors.blue_200;
      ctx.fillRect(
        mouse_org_x,
        mouse_org_y,
        mouse.x - mouse_org_x,
        mouse.y - mouse_org_y
      );
      ctx.globalAlpha = 1;
    }
    this.paint_needed = false;
  };
  this.initialize = function(object) {
    object.selectable = true;
    object.selected = false;
    object.just_selected = false;
    object.focused = false;
    object.selection_index = this.managed_objects.length;
    this.managed_objects.push(object);
  };
  this.focus = function(object) {
    if (object.selectable && object.selection_index !== undefined) {
      var prev = this.managed_objects[this.focused_object_index];
      if (prev !== undefined) {
        prev.focused = false;
      }

      object.focused = true;
      object.just_selected = !object.selected;
      object.selected = true;
      var index = this.selected_object_indeces.indexOf(object.selection_index);
      if (index === -1)
        this.selected_object_indeces.push(object.selection_index);
      this.focused_object_index = object.selection_index;
      this.paint_needed = true;

      this.onItemFocus();
    }
  };
  this.select = function(object) {
    if (object.selectable && object.selection_index !== undefined) {
      object.just_selected = !object.selected;
      object.selected = true;
      var index = this.selected_object_indeces.indexOf(object.selection_index);
      if (index === -1)
        this.selected_object_indeces.push(object.selection_index);

      this.paint_needed = true;
    }
  };
  this.addSelection = function(object) {
    if (object.selectable && object.selection_index !== undefined) {
      object.just_selected = !object.selected;
      object.selected = true;
      var index = this.selected_object_indeces.indexOf(object.selection_index);
      if (index === -1)
        this.selected_object_indeces.push(object.selection_index);

      this.paint_needed = true;
    }
  };
  this.removeSelection = function(object) {
    if (this.deselect_enabled) {
      if (object.selectable && object.selection_index !== undefined) {
        object.selected = false;
        if (object.focused) {
          object.focused = false;
          this.focused_object_index = -1;
          this.onItemDefocus();
        }
        var index = this.selected_object_indeces.indexOf(
          object.selection_index
        );
        if (index > -1) this.selected_object_indeces.splice(index, 1);

        this.paint_needed = true;
      }
    }
  };
  this.removeAllSelections = function() {
    if (this.deselect_enabled) {
      pending_remove_all_selection = false;
      this.selected_object_indeces = [];
      this.focused_object_index = -1;
      for (var i = 0; i < this.managed_objects.length; i++) {
        this.managed_objects[i].selected = false;
        this.managed_objects[i].focused = false;
      }

      this.paint_needed = true;

      this.onItemDefocus();
    }
  };
  this.getFocusedItem = function() {
    return this.managed_objects[this.focused_object_index];
  };
  this.onItemFocus = function() {};
  this.onItemDefocus = function() {};
  this.nothingSelected = function() {
    var something = false;
    for (var i = 0; i < this.managed_objects.length; i++) {
      something = something || this.managed_objects[i].selected;
    }
    return !something;
  };

  var drag_box = false;
  var mouse_org_x = 0;
  var mouse_org_y = 0;
  var originally_selected_array = [];
  var original_focus = -1;
  var pending_remove_all_selection = false;
  var mouse_down_over_obj = false;
  var mouse_down_obj_index = -1;
  var moved_object = false;
  this.multi_select = false;

  var mouse = {};
  mouse.x = Mouse.x;
  mouse.y = Mouse.y;
  this.input_transform = function(m) {
    m.x =
      m.x -
      TableMapClient.canvas.getBoundingClientRect().left +
      Mouse.scroll_left;
    m.y =
      m.y -
      TableMapClient.canvas.getBoundingClientRect().top +
      Mouse.scroll_top;
    return m;
  };
  this.setInputTransform = function(transform) {
    this.input_transform = transform;
  };
  this.onMouseDown = function() {
    mouse_org_x = mouse.x;
    mouse_org_y = mouse.y;
    var intersected = false;
    for (var i = 0; i < this.managed_objects.length; i++) {
      var obj = this.managed_objects[i];
      if (intersectsMouse(obj.x, obj.y, obj.w, obj.h)) {
        mouse_down_obj_index = i;
        intersected = true;
        if (!obj.selected) {
          if (Keyboard.shift) {
            //add to selection
            this.addSelection(this.managed_objects[i]);
          } else {
            //remove other selections
            if (this.selected_object_indeces.length !== 0) {
              if (
                this.selected_object_indeces[0] !==
                this.managed_objects[i].selection_index
              ) {
                //this.removeAllSelections();
                pending_remove_all_selection = true;
              }
            }
            //this.removeAllSelections();
            this.addSelection(this.managed_objects[i]);
          }
        } else {
          if (Keyboard.shift) {
            //remove from selection
            //this.removeSelection(this.managed_objects[i]);
          } else {
            //remove other selections
            //focus
            if (this.selected_object_indeces.length !== 0) {
              if (
                this.selected_object_indeces[0] !==
                this.managed_objects[i].selection_index
              ) {
                //this.removeAllSelections();
                pending_remove_all_selection = true;
              }
            }
            this.addSelection(this.managed_objects[i]);
          }
        }
        i = this.managed_objects.length;
      }
    }
    mouse_down_over_obj = intersected;
    if (!intersected) mouse_down_obj_index = -1;
    if (!intersected && (!Keyboard.shift || !this.select_box_enabled))
      pending_remove_all_selection = true;
    //this.removeAllSelections();
    //copy data from one array to the other
    originally_selected_array = [];
    for (var i = 0; i < this.selected_object_indeces.length; i++) {
      originally_selected_array[i] = this.selected_object_indeces[i];
    }
    original_focus = this.focused_object_index - 1 + 1;
  };
  this.onMouseUp = function() {
    if (pending_remove_all_selection) {
      this.removeAllSelections();
    }
    var intersected = false;
    var focused_something_already = false;
    var something_focused = false;
    for (var i = 0; i < this.managed_objects.length; i++) {
      something_focused = something_focused || this.managed_objects[i].focused;
    }
    for (var i = 0; i < this.managed_objects.length; i++) {
      var obj = this.managed_objects[i];
      if (intersectsMouse(obj.x, obj.y, obj.w, obj.h)) {
        if (
          (!Keyboard.shift || this.focused_object_index === -1) &&
          !drag_box
        ) {
          if (
            !focused_something_already &&
            (!moved_object || !something_focused)
          ) {
            this.focus(this.managed_objects[i]);
            focused_something_already = true;
          }
        }
        intersected = true;

        if (obj.selected && Keyboard.shift && !obj.just_selected && !drag_box) {
          this.removeSelection(this.managed_objects[i]);
        }
      }
    }
    for (var i = 0; i < this.managed_objects.length; i++) {
      this.managed_objects[i].just_selected = false;
    }
    this.multi_select = this.selected_object_indeces.length > 1;
    if (!intersected && !drag_box) {
      this.removeAllSelections();
    }
    this.paint_needed = true;
    drag_box = false;
    moved_object = false;
  };
  this.onMouseMove = function() {
    if (Mouse.left_pressed && this.select_box_enabled && !mouse_down_over_obj) {
      drag_box = true;
      pending_remove_all_selection = false;
    } else if (Mouse.left_pressed && mouse_down_over_obj) {
      moved_object = true;
    }

    if (
      Mouse.left_pressed &&
      mouse_down_over_obj &&
      !drag_box &&
      mouse_down_obj_index !== -1 &&
      !this.multi_select
    ) {
      this.removeAllSelections();
      this.addSelection(this.managed_objects[mouse_down_obj_index]);
    }
    //see if drag box has selected anything and add them to the selection
    if (drag_box && this.select_box_enabled) {
      this.paint_needed = true;
      var intersected = false;
      for (var i = 0; i < this.managed_objects.length; i++) {
        var obj = this.managed_objects[i];
        if (
          intersects(obj, {
            x: mouse_org_x < mouse.x ? mouse_org_x : mouse.x,
            y: mouse_org_y < mouse.y ? mouse_org_y : mouse.y,
            w: Math.abs(mouse.x - mouse_org_x),
            h: Math.abs(mouse.y - mouse_org_y)
          })
        ) {
          intersected = true;
          this.addSelection(this.managed_objects[i]);
        } else {
          this.removeSelection(this.managed_objects[i]);
        }
      }
      if (Keyboard.shift) {
        for (var i = 0; i < originally_selected_array.length; i++) {
          var index = this.selected_object_indeces.indexOf(
            originally_selected_array[i]
          );
          if (index === -1) {
            this.addSelection(
              this.managed_objects[originally_selected_array[i]]
            );
          }
        }
        if (original_focus !== -1) {
          this.focus(this.managed_objects[original_focus]);
        }
      }
    }
  };

  function intersectsMouse(x, y, w, h) {
    return mouse.x <= x + w && mouse.x > x && mouse.y <= y + h && mouse.y > y;
  }
  function containsPoint(rect, point) {
    return (
      point.x <= rect.x + rect.w &&
      point.x > rect.x &&
      point.y <= rect.y + rect.h &&
      point.y > rect.y
    );
  }
  function intersects(rect1, rect2) {
    var pt_1_1 = { x: rect1.x, y: rect1.y };
    var pt_1_2 = { x: rect1.x + rect1.w, y: rect1.y };
    var pt_1_3 = { x: rect1.x + rect1.w, y: rect1.y + rect1.h };
    var pt_1_4 = { x: rect1.x, y: rect1.y + rect1.h };

    var pt_2_1 = { x: rect2.x, y: rect2.y };
    var pt_2_2 = { x: rect2.x + rect2.w, y: rect2.y };
    var pt_2_3 = { x: rect2.x + rect2.w, y: rect2.y + rect2.h };
    var pt_2_4 = { x: rect2.x, y: rect2.y + rect2.h };

    return (
      containsPoint(rect1, pt_2_1) ||
      containsPoint(rect1, pt_2_2) ||
      containsPoint(rect1, pt_2_3) ||
      containsPoint(rect1, pt_2_4) ||
      containsPoint(rect2, pt_1_1) ||
      containsPoint(rect2, pt_1_2) ||
      containsPoint(rect2, pt_1_3) ||
      containsPoint(rect2, pt_1_4) ||
      (rect1.h < rect2.h &&
        rect1.y > rect2.y &&
        rect1.y < rect2.y + rect2.h &&
        rect1.x < rect2.x &&
        rect1.x + rect1.w > rect2.x + rect2.w) ||
      (rect2.h < rect1.h &&
        rect2.y > rect1.y &&
        rect2.y < rect1.y + rect1.h &&
        rect2.x < rect1.x &&
        rect2.x + rect2.w > rect1.x + rect1.w)
    );
  }
};

/*
 * IMPORTANT NOTE
 * This manager class assumes all objects managed throughout it have a 'selected' and a 'focused' property, as well as
 * x, y, w, h, corresponding to the object's bounding box cordinates and dimensions.
 * Therefore, it is recommended to use this in accompany with the SelectionManager class.
 *
 * Dependencies
 * [tabletapp.js] Mouse
 * [jQuery.min.js] $
 */
var GrabResizeManager = function() {
  document.addEventListener(
    "mousemove",
    function(evt) {
      mouse.x = evt.clientX;
      mouse.y = evt.clientY;
      mouse = this.input_transform(mouse);
      if (this.enabled) this.onMouseMove();
    }.bind(this),
    false
  );
  document.addEventListener(
    "mousedown",
    function(evt) {
      if (evt.button === 0 && this.enabled) {
        this.onMouseDown();
      }
    }.bind(this),
    false
  );
  document.addEventListener(
    "mouseup",
    function(evt) {
      if (evt.button === 0 && this.enabled) {
        this.onMouseUp();
      }
    }.bind(this),
    false
  );

  this.enabled = true;
  this.snapping = false;
  this.debug = false;
  this.linked_manager = null;
  this.snapping_grid = true;
  this.snapping_grid_size = 20;
  this.minimum_size = 20;
  this.paint_needed = false;
  this.onPropertyChange = function() {};
  //data can have a 'priority' property additionally
  //NOTE: this doesn't work yet
  this.snap_lines_vertical = [];
  this.snap_lines_horizontal = [];
  this.snap_points = [];
  this.snap_pixel_tolerance = 20;
  this.managed_objects = [];
  this.canvas;
  this.grabber_size = 14;

  this.initialize = function(selection_manager, canvas_id_param) {
    for (var i = 0; i < selection_manager.managed_objects.length; i++) {
      var obj = selection_manager.managed_objects[i];
      this.snapTo(obj, obj);
      this.managed_objects.push(obj);
    }
    this.canvas = document.getElementById(canvas_id_param);
    this.linked_manager = selection_manager;
  };
  this.addObject = function(obj) {
    this.snapTo(obj, obj);
    this.managed_objects.push(obj);
  };
  this.paint = function(ctx) {
    if (!this.enabled) {
      this.paint_needed = false;
      return null;
    }
    ctx.fillStyle = "black";
    ctx.globalAlpha = 1;
    if (LAYOUT_BOUNDS) {
      ctx.fillStyle = "#FF0000";
      ctx.globalAlpha = 0.12;
      for (var i = 0; i < this.managed_objects.length; i++) {
        var obj = this.managed_objects[i];
        var rects = [];
        var m = this.grabber_size / 2;
        var f = this.grabber_size;
        rects[0] = { x: obj.x - m, y: obj.y - m, w: f, h: f };
        rects[1] = { x: obj.x + obj.w - m, y: obj.y - m, w: f, h: f };
        rects[2] = { x: obj.x + obj.w - m, y: obj.y + obj.h - m, w: f, h: f };
        rects[3] = { x: obj.x - m, y: obj.y + obj.h - m, w: f, h: f };

        rects[4] = { x: obj.x + obj.w / 2 - m, y: obj.y - m, w: f, h: f };
        rects[5] = {
          x: obj.x + obj.w - m,
          y: obj.y + obj.h / 2 - m,
          w: f,
          h: f
        };
        rects[6] = {
          x: obj.x + obj.w / 2 - m,
          y: obj.y + obj.h - m,
          w: f,
          h: f
        };
        rects[7] = { x: obj.x - m, y: obj.y + obj.h / 2 - m, w: f, h: f };

        for (var j = 0; j < rects.length; j++) {
          ctx.fillRect(rects[j].x, rects[j].y, rects[j].w, rects[j].h);
        }
      }
      ctx.globalAlpha = 1;
    }
    this.paint_needed = false;
  };

  var deltas = [];
  var grab_started = false;
  var resize_started = false;
  var resize_type = Handle.BL;
  var captured_objs = [];
  var captured_mouse = {};
  var anim_timer = {};
  var intent = {};

  var mouse = {};
  mouse.x = Mouse.x;
  mouse.y = Mouse.y;
  this.input_transform = function(m) {
    m.x =
      m.x -
      TableMapClient.canvas.getBoundingClientRect().left +
      Mouse.scroll_left;
    m.y =
      m.y -
      TableMapClient.canvas.getBoundingClientRect().top +
      Mouse.scroll_top;
    return m;
  };
  this.setInputTransform = function(transform) {
    this.input_transform = transform;
  };
  this.onMouseDown = function() {
    var already_chosen_type = false;
    for (var i = 0; i < this.managed_objects.length; i++) {
      deltas[i] = {
        x: mouse.x - this.managed_objects[i].x,
        y: mouse.y - this.managed_objects[i].y
      };
      var obj = this.managed_objects[i];
      if (intersectsMouse(obj.x, obj.y, obj.w, obj.h)) {
        grab_started = true;
      }

      captured_objs[i] = {};
      captured_objs[i].x = obj.x + 1 - 1;
      captured_objs[i].y = obj.y + 1 - 1;
      captured_objs[i].w = obj.w + 1 - 1;
      captured_objs[i].h = obj.h + 1 - 1;
      captured_mouse.x = mouse.x + 1 - 1;
      captured_mouse.y = mouse.y + 1 - 1;

      var tmp_resize_type = getHandleType(obj);

      resize_started = tmp_resize_type !== -1 || resize_started;
      if (resize_started && !already_chosen_type) {
        already_chosen_type = true;
        resize_type = tmp_resize_type;

        this.linked_manager.deselect_enabled = false;
        this.linked_manager.select_box_enabled = false;
      }
    }
  };
  this.onMouseMove = function() {
    var tmp = -1;
    for (var i = 0; i < this.managed_objects.length; i++) {
      if (this.managed_objects[i].selected)
        tmp = getHandleType(this.managed_objects[i]);
      if (tmp !== -1) break;
    }
    //TODO jQuery mice
    if (grab_started) tmp = -1;
    switch (resize_started ? resize_type : tmp) {
      case Handle.UL:
      case Handle.BR:
        $(this.canvas).css("cursor", "nwse-resize");
        break;
      case Handle.UR:
      case Handle.BL:
        $(this.canvas).css("cursor", "nesw-resize");
        break;
      case Handle.UM:
      case Handle.BM:
        $(this.canvas).css("cursor", "ns-resize");
        break;
      case Handle.LM:
      case Handle.RM:
        $(this.canvas).css("cursor", "ew-resize");
        break;
      default:
        $(this.canvas).css("cursor", "auto");
        break;
    }

    if (grab_started) {
      this.linked_manager.deselect_enabled = false;
      this.linked_manager.select_box_enabled = false;
    }
    if (grab_started || resize_started) {
      this.paint_needed = true;
      for (var i = 0; i < this.managed_objects.length; i++) {
        var obj = this.managed_objects[i];

        intent = {};
        intent.x = this.managed_objects[i].x;
        intent.y = this.managed_objects[i].y;
        intent.w = this.managed_objects[i].w;
        intent.h = this.managed_objects[i].h;
        if (obj.selected) {
          if (resize_started) {
            var dX = mouse.x - captured_mouse.x;
            var dY = mouse.y - captured_mouse.y;
            switch (resize_type) {
              case Handle.UL:
                intent.x = mouse.x - deltas[i].x;
                intent.y = mouse.y - deltas[i].y;
                intent.w = captured_objs[i].w - dX;
                intent.h = captured_objs[i].h - dY;
                break;
              case Handle.UR:
                intent.y = mouse.y - deltas[i].y;
                intent.w = captured_objs[i].w + dX;
                intent.h = captured_objs[i].h - dY;
                break;
              case Handle.BR:
                intent.w = captured_objs[i].w + dX;
                intent.h = captured_objs[i].h + dY;
                break;
              case Handle.BL:
                intent.x = mouse.x - deltas[i].x;
                intent.w = captured_objs[i].w - dX;
                intent.h = captured_objs[i].h + dY;
                break;

              case Handle.UM:
                intent.y = mouse.y - deltas[i].y;
                intent.h = captured_objs[i].h - dY;
                break;
              case Handle.RM:
                intent.w = captured_objs[i].w + dX;
                break;
              case Handle.BM:
                intent.h = captured_objs[i].h + dY;
                break;
              case Handle.LM:
                intent.x = mouse.x - deltas[i].x;
                intent.w = captured_objs[i].w - dX;
                break;
            }
          } else {
            if (grab_started) {
              intent.x = mouse.x - deltas[i].x;
              intent.y = mouse.y - deltas[i].y;
            }
          }
        }
        //TODO implement snapping
        if (obj.selected) {
          this.snapTo(intent, this.managed_objects[i]);
        }
        //                this.managed_objects[i].x = intent.x;
        //                this.managed_objects[i].y = intent.y;
        //                this.managed_objects[i].w = intent.w;
        //                this.managed_objects[i].h = intent.h;
      }
    }
  };
  this.onMouseUp = function() {
    this.linked_manager.deselect_enabled = true;
    this.linked_manager.select_box_enabled = true;
    grab_started = false;
    resize_started = false;
  };
  this.snapToSmooth = function(intent, object) {
    var dX = intent.x - object.x;
    var dY = intent.y - object.y;
    var dW = intent.w - object.w;
    var dH = intent.h - object.h;
    if (dX !== 0) {
      window.clearInterval(anim_timer.x);
      Util.animate(anim_timer.x, Util.decelerateInterpolator, 600, function(
        frac
      ) {
        object.x = intent.x + dX * frac;
      });
    }
    if (dY !== 0) {
      window.clearInterval(anim_timer.y);
      Util.animate(anim_timer.y, Util.decelerateInterpolator, 600, function(
        frac
      ) {
        object.y = intent.y + dY * frac;
      });
    }
    if (dW !== 0) {
      window.clearInterval(anim_timer.w);
      Util.animate(anim_timer.w, Util.decelerateInterpolator, 600, function(
        frac
      ) {
        object.w = intent.w + dW * frac;
      });
    }
    if (dH !== 0) {
      window.clearInterval(anim_timer.h);
      Util.animate(anim_timer.h, Util.decelerateInterpolator, 600, function(
        frac
      ) {
        object.h = intent.h + dH * frac;
      });
    }
  };
  var prevObj = { x: 0, y: 0, w: 0, h: 0 };
  this.snapTo = function(intent, object) {
    //TODO fix snapping bug
    var horiz = true;
    var vert = true;
    if (intent.w < this.minimum_size) horiz = false;
    if (intent.h < this.minimum_size) vert = false;
    prevObj.x = object.x + 0;
    prevObj.y = object.y + 0;
    prevObj.w = object.w + 0;
    prevObj.h = object.h + 0;
    var g = this.snapping_grid_size;
    if (!this.snapping_grid) {
      if (horiz) {
        object.x = intent.x;
        object.w = intent.w;
      }
      if (vert) {
        object.h = intent.h;
        object.y = intent.y;
      }
    } else {
      if (horiz) {
        object.x =
          intent.x +
          (intent.x % g < g / 2 ? -(intent.x % g) : g - (intent.x % g));
        object.w =
          intent.w +
          (intent.w % g <= g / 2 ? -(intent.w % g) : g - (intent.w % g));
      }
      if (vert) {
        object.h =
          intent.h +
          (intent.h % g < g / 2 ? -(intent.h % g) : g - (intent.h % g));
        object.y =
          intent.y +
          (intent.y % g <= g / 2 ? -(intent.y % g) : g - (intent.y % g));
      }
    }
    if (object.w < this.minimum_size) object.w = this.minimum_size;
    if (object.h < this.minimum_size) object.h = this.minimum_size;

    if (
      prevObj.x !== object.x ||
      prevObj.y !== object.y ||
      prevObj.w !== object.w ||
      prevObj.h !== object.h
    )
      this.onPropertyChange();
  };

  var getHandleType = function getHandleType(obj) {
    var rects = [];
    var m = this.grabber_size / 2;
    var f = this.grabber_size;
    rects[0] = { x: obj.x - m, y: obj.y - m, w: f, h: f };
    rects[1] = { x: obj.x + obj.w - m, y: obj.y - m, w: f, h: f };
    rects[2] = { x: obj.x + obj.w - m, y: obj.y + obj.h - m, w: f, h: f };
    rects[3] = { x: obj.x - m, y: obj.y + obj.h - m, w: f, h: f };

    rects[4] = { x: obj.x + obj.w / 2 - m, y: obj.y - m, w: f, h: f };
    rects[5] = { x: obj.x + obj.w - m, y: obj.y + obj.h / 2 - m, w: f, h: f };
    rects[6] = { x: obj.x + obj.w / 2 - m, y: obj.y + obj.h - m, w: f, h: f };
    rects[7] = { x: obj.x - m, y: obj.y + obj.h / 2 - m, w: f, h: f };

    var tmp_resize_type = -1;
    if (intersectsMouseRect(rects[0])) tmp_resize_type = Handle.UL;
    if (intersectsMouseRect(rects[1])) tmp_resize_type = Handle.UR;
    if (intersectsMouseRect(rects[2])) tmp_resize_type = Handle.BR;
    if (intersectsMouseRect(rects[3])) tmp_resize_type = Handle.BL;

    if (intersectsMouseRect(rects[4])) tmp_resize_type = Handle.UM;
    if (intersectsMouseRect(rects[5])) tmp_resize_type = Handle.RM;
    if (intersectsMouseRect(rects[6])) tmp_resize_type = Handle.BM;
    if (intersectsMouseRect(rects[7])) tmp_resize_type = Handle.LM;

    return tmp_resize_type;
  }.bind(this);
  function intersectsMouseRect(rect) {
    return (
      mouse.x <= rect.x + rect.w &&
      mouse.x > rect.x &&
      mouse.y <= rect.y + rect.h &&
      mouse.y > rect.y
    );
  }
  function intersectsMouse(x, y, w, h) {
    return mouse.x <= x + w && mouse.x > x && mouse.y <= y + h && mouse.y > y;
  }
};

//ENUMS
var GrabberType = {
  Box: 0,
  Circle: 1
};
var Handle = {
  UL: 0,
  UM: 1,
  UR: 3,
  BL: 4,
  BM: 5,
  BR: 6,
  RM: 7,
  LM: 8
};
var PrivacyLevel = {
  Public: "Public",
  Private: "Private"
};
var TableMapItemType = {
  server: ["Table", "Block", "Stair"],
  "en-US": ["Table", "Block", "Stair"],
  "hu-HU": ["Asztal", "Blokk", "Lépcsó"]
};
var MapItemShapeType = {
  server: ["Rectangle", "Circle", "Hexagon", "Octagon", "Ellipse", "Rhombus"],
  "en-US": ["Rectangle", "Circle", "Hexagon", "Octagon", "Ellipse", "Rhombus"],
  "hu-HU": ["Négyszög", "Kör", "Hexagon", "Oktogon", "Ellipszis", "Rombusz"]
};
var MapItemTag = {
  server: [
    "Panorama",
    "PremiumTable",
    "VIPSector",
    "Cassa",
    "WC",
    "Terrace",
    "SmokingArea",
    "NoSmokingArea",
    "Heater",
    "Shade",
    "Elevator",
    "Playground",
    "Lake",
    "Information"
  ],
  "en-US": [
    "Panorama",
    "Premium table",
    "VIP sector",
    "Cassa",
    "WC",
    "Terrace",
    "Smoking area",
    "No smoking area",
    "Heater",
    "Shade",
    "Elevator",
    "Playground",
    "Lake",
    "Information"
  ],
  "hu-HU": [
    "Panoráma",
    "Premium asztal",
    "VIP szektor",
    "Kassza",
    "WC",
    "Terasz",
    "Dohányzó",
    "Nemdohányzó",
    "Melegító",
    "Ernyő",
    "Lift",
    "Játszótér",
    "Tó",
    "Információ"
  ]
};
var DialogType = {
  NoInternet: 0,
  NotLoggedIn: 1,
  Loading: 2
};
var Pages = {
  NoTableMap: 0,
  Main: 1,
  Edit: 2,
  Settings: 3,
  Error: 4
};
var TableMapState = {
  Downloaded: 0,
  Loading: 1,
  Empty: 2,
  Error: 3,
  BackendError: 4
};
var ContextMenuType = {
  NormalMode: 1,
  EditMode: 2,
  EditModeItem: 3
};

//hu-HU
var lang = home_lang;
var tm_strings = {
  "en-US": {
    dialog_ok: "OK",
    dialog_retry: "RETRY",
    dialog_cancel: "CANCEL",
    dialog_yes: "YES",
    dialog_no: "NOPE",
    dialog_abort: "ABORT",
    dialog_action_remove: "REMOVE",
    dialog_action_delete: "DELETE",
    dialog_action_discard: "DISCARD",
    dialog_remove_items: "Remove selected items?",
    dialog_discard: "Discard unsaved changes?",
    dialog_title_failed: "Operation failed",
    dialog_no_internet: "No internet connection.",
    dialog_no_session: "Please log in to continue.",
    dialog_upload_success: "New TableMap uploaded successfully.",
    dialog_update_success: "Your TableMap has been updated successfully.",
    dialog_remove_success: "Your TableMap has been deleted successfully.",
    dialog_create_tablemap: "Create new TableMap?",
    dialog_confirm_save: "Save changes?",
    dialog_delete_tablemap:
      "Are you sure you would like to delete your TableMap?",
    dialog_select_type: "Select type:",
    dialog_no_more_tags: "There are no more tags left to add.",
    dialog_enter_item_id: "Enter item ID:",
    dialog_enter_group_name: "Enter new group name:",
    dialog_privacy_note:
      "NOTE: your TableMap will be accessible by all smartphone app users.",
    dialog_privacy_private:
      "Your privacy is set to private. No one can access the map expect you.",
    dialog_delete_group: "Are you sure you would like to delete this group?",
    dialog_add_group: "Add new group?",
    toast_no_navigation: "There is no page to go back to.",
    toast_dismiss: "DISMISS",
    toast_nothing_to_delete: "There is nothing to delete.",
    tools: "Tools",
    page_nomap_message:
      "You do not have any TableMaps associated with your Restaurant. To get started, create a new TableMap by clicking the 'Add new' button below.",
    button_add_new: "ADD NEW",
    button_learn_more: "LEARN MORE",
    button_add_items: "ADD ITEMS",
    button_properties: "PROPERTIES",
    button_groups: "GROUPS",
    button_upload: "UPLOAD",
    button_save: "SAVE",
    common_items: "COMMON ITEMS",
    table: "TABLE",
    block: "BLOCK",
    public: "Public",
    private: "Private",
    set_privacy: "Set privacy:",
    floors: "Floors:",
    group: "Group {0}",
    capacity: "Capacity: ",
    label: "Description {0}",
    loading: "Loading...",
    tablemap_error: "Sorry, something went wrong at our end.",
    no_table_map: "No TableMap",
    help_panel_add_items:
      "This tab enables you to add new items to your TableMap. Double click, or drag-and-drop on the map area to the left to place a new item. You can edit the newly added item's properties in the second tab.",
    help_panel_properties:
      "This tab enables you to set the properties of a given item, such as guest capacity, and tags. You can also access this tab by right clicking and choosing 'Properties' from the context menu.",
    help_panel_groups:
      "This tab enables you to configure groups on your map. This way, when a reservation arrives that exceeds the maximum capacity of a table, it is assigned to a group.",
    license: "©2015-2016 Tapp Corp. Ltd. All rights reserved.",
    appearance_n_behavior: "APPEARANCE & BEHAVIOR",
    type: "Type:",
    label_hint: "Label",
    ID: "ID",
    rotation_short: "rot.",
    x: "x",
    y: "y",
    width_short: "w",
    height_short: "h",
    shape: "Shape:",
    guest_capacity: "Guest capacity: ",
    reservable: "Reservable",
    occupyable: "Occupyable",
    labelable: "Labelable",
    movable: "Movable",
    editable: "Editable",
    resizable: "Resizable",
    tags: "TAGS",
    services: "SERVICES"
  },
  "hu-HU": {
    dialog_ok: "OK",
    dialog_retry: "ÚJRA",
    dialog_cancel: "MÉGSE",
    dialog_yes: "IGEN",
    dialog_no: "NEM",
    dialog_abort: "MEGSZAKÍT",
    dialog_action_remove: "TÖRLÉS",
    dialog_action_delete: "TÖRLÉS",
    dialog_action_discard: "ELVETÉS",
    dialog_remove_items: "Kijelölt elemek törlése?",
    dialog_discard: "Nem mentett változtatások elvetése?",
    dialog_title_failed: "Művelet sikertelen",
    dialog_no_internet: "Nincs internetkapcsolat.",
    dialog_no_session: "A folytatáshoz bejelentkezés szükséges.",
    dialog_upload_success: "Új TableMap feltöltése sikeresen megtörtént.",
    dialog_update_success: "A TableMap frissítése sikeresen megtörtént.",
    dialog_remove_success: "A TableMap törlése sikeresen megtörtént.",
    dialog_create_tablemap: "Új TableMap létrehozása?",
    dialog_confirm_save: "Változtatások mentése?",
    dialog_delete_tablemap: "Biztos, hogy töröljük a TableMap-et?",
    dialog_select_type: "Típus kiválasztása:",
    dialog_no_more_tags: "Nincs több címke, amit hozzá lehetne adni.",
    dialog_enter_item_id: "Az elem azonosítója:",
    dialog_enter_group_name: "Az új csoport neve:",
    dialog_privacy_note:
      "Megjegyzés: a TableMap minden okostelefonos felhasználó számára elérhető lesz.",
    dialog_privacy_private:
      "A láthatóság privátra van állítva, így senki sem férhet hozzá a térképhez.",
    dialog_delete_group: "Biztos, hogy töröljük a csoportot?",
    dialog_add_group: "Új csoport létrehozása?",
    toast_no_navigation: "Nincs oldal amire vissza lehetne menni.",
    toast_dismiss: "RENDBEN",
    toast_nothing_to_delete: "Nincs mit törölni.",
    tools: "Eszközök",
    page_nomap_message:
      "Nem találtunk az éttermi fiókhoz kapcsolt TableMap-et. A folytatáshoz szükséges egy új TableMap létrehozása az 'Új' gombra kattintva.",
    button_add_new: "ÚJ",
    button_learn_more: "RÉSZLETEK",
    button_add_items: "HOZZÁADÁS",
    button_properties: "TULAJDONSÁGOK",
    button_groups: "CSOPORTOK",
    button_upload: "FELTÖLTÉS",
    button_save: "MENTÉS",
    common_items: "ALAP ELEMEK",
    table: "ASZTAL",
    block: "BLOKK",
    public: "Nyilvános",
    private: "Privát",
    set_privacy: "Láthatóság:",
    floors: "Szintek száma:",
    group: "{0}. csoport",
    capacity: "Férőhelyek: ",
    label: "Leírás {0}",
    loading: "Betöltés...",
    tablemap_error: "Sajnáljuk, de valami hiba történt nálunk.",
    no_table_map: "Nincs TableMap",
    help_panel_add_items:
      "Ez a fül lehetővé teszi az új elemek hozzáadását a TableMap-hez. Dupla klikkel, vagy a bal egérgomb letartásával és áthúzzással lehet az új elemet elhelyezni. Az újonnan elhelyezett elem tulajdonságait a második fülben lehet álllítani.",
    help_panel_properties:
      "Ez a fül teszi lehetővé egy adott elem tulajdonságainak szerkesztését, például a vendég kapacitása, és tag-ek. Ez a fül még elérhető egy jobb klikket követően az adott elemre, és a 'Tulajdonságok' menüpontot választva.",
    help_panel_groups:
      "Ez a fül lehetővé teszi csoportok létrehozását a térképen. Így, ha egy olyan foglalás érkezik ami nem fér el egy adott asztalon, egy csoporthoz lesz rendelve.",
    license: "©2015-2016 Tapp Corp. Kft. Minden jog fenntartva.",
    appearance_n_behavior: "MEGJELENÉS & MŰKÖDÉS",
    type: "Típus:",
    label_hint: "Leírás",
    ID: "ID",
    rotation_short: "forg.",
    x: "x",
    y: "y",
    width_short: "szél.",
    height_short: "mag.",
    shape: "Forma:",
    guest_capacity: "Férőhelyek: ",
    reservable: "Foglalható",
    occupyable: "Elfoglalható",
    labelable: "Címkézhető",
    movable: "Mozgatható",
    editable: "Szerkeszthető",
    resizable: "Méretezhető",
    tags: "CÍMKÉK",
    services: "SZOLGÁLTATÁSOK"
  }
};

//HTMLDialog
HTMLDialog.Builder = function() {
  this.settings = {};
  this.settings.positivebutton = {};
  this.settings.negativebutton = {};
  this.settings.builder_used = true;
  this.setPositiveButton = function(text) {
    this.settings.positivebutton = {
      x: 0,
      y: 0,
      w: 70,
      h: 24,
      elevated: false,
      text: text,
      color: "rgba(0, 0, 0, 0.00)"
    };
    return this;
  };
  this.setNegativeButton = function(text) {
    this.settings.negativebutton = {
      x: 0,
      y: 0,
      w: 70,
      h: 24,
      elevated: false,
      text: text,
      color: "rgba(0, 0, 0, 0.00)"
    };
    return this;
  };
  this.setPositiveAction = function(action) {
    this.settings.positiveaction = action;
    return this;
  };
  this.setNegativeAction = function(action) {
    this.settings.negativeaction = action;
    return this;
  };
  this.setMessage = function(text) {
    this.settings.message = text;
    return this;
  };
  this.setTitle = function(text) {
    this.settings.title = text;
    return this;
  };
  this.setIcon = function(icon) {
    this.settings.icon = icon;
    return this;
  };
  this.show = function() {
    var h =
      this.settings.title === undefined
        ? ""
        : "<span>" + this.settings.title + "</span>";
    var c = "<span>" + this.settings.message + "</span>";
    HTMLDialog.positiveaction = this.settings.positiveaction;
    HTMLDialog.negativeaction = this.settings.negativebutton;
    var a =
      "<button class='pull-right' style='margin-left: 10px; width: " +
      this.settings.positivebutton.w +
      "px;' onclick='if (HTMLDialog.positiveaction !== undefined) {HTMLDialog.positiveaction(); }\ncloseDialog();'>" +
      this.settings.positivebutton.text +
      "</button>\n\
                     <button class='pull-right' style='margin-left: 10px; width: " +
      this.settings.negativebutton.w +
      "px;' onclick='if (HTMLDialog.negativeaction !== undefined) {HTMLDialog.negativeaction(); }\ncloseDialog();'>" +
      this.settings.negativebutton.text +
      "</button>\n";
    showDialog(h, c, a);
  };
};

var Util = {};
Util.animate = function(
  timer,
  interpolator,
  duration,
  callback,
  callbackOnFinish,
  offset,
  no_paint_reqest
) {
  if (no_paint_reqest === undefined) no_paint_reqest = false;
  if (NO_ANIMATION) {
    duration = 1;
    offset = 0;
    TableMapClient.paint();
  }
  window.clearInterval(timer);
  var timed_out = false;
  if (offset !== undefined && offset > 0) {
    setTimeout(function() {
      timed_out = true;
    }, offset);
  } else timed_out = true;
  return start();
  function start() {
    window.clearInterval(timer);
    timer = setInterval(step, 1000 / Util.animationFPS);
    var startTime = Date.now();
    function step() {
      if (!timed_out) {
        startTime = Date.now();
        return null;
      }
      var elapsed = Date.now() - startTime;
      var clipped = elapsed > duration ? duration : elapsed;
      var fraction = interpolator(clipped / duration);
      if (elapsed >= duration) {
        window.clearInterval(timer);
        if (callback !== undefined) callback(fraction);
        if (
          callbackOnFinish !== undefined &&
          typeof callbackOnFinish == "function"
        )
          callbackOnFinish();
        if (!no_paint_reqest) {
          Util.animating = false;
          TableMapClient.paint();
        }
      } else {
        if (callback !== undefined) callback(fraction);
        if (!no_paint_reqest) {
          TableMapClient.paint();
          Util.animating = true;
        }
      }
    }
    return timer;
  }
};
Util.animating = false;
Util.interpolationWeight = 3.5;
Util.assymetricRatio = 0.3;
Util.animationFPS = 60; //Frames per second
Util.accelerateDecelerateInterpolator = function(t) {
  var value = 0;
  if (t <= 0.5) value = Math.pow(t * 2, Util.interpolationWeight) / 2;
  else value = 0.5 + (1 - Math.pow(2 - t * 2, Util.interpolationWeight)) / 2;
  return value;
};
Util.assymetricInterpolator = function(t) {
  var value = 0;
  var r = Util.assymetricRatio;
  var x = t;
  if (t <= Util.assymetricRatio)
    value =
      accelerateInterpolator(t / Util.assymetricRatio) * Util.assymetricRatio;
  else
    value =
      (1 - r) *
        (1 - Math.pow((1 / (1 - r)) * (1 - x), Util.interpolationWeight)) +
      r;
  return value;
};
Util.decelerateInterpolator = function(t) {
  return 1 - Math.pow(1 - t, Util.interpolationWeight);
};
Util.accelerateInterpolator = function(t) {
  return Math.pow(t, Util.interpolationWeight);
};
Util.linearInterpolator = function(t) {
  return t;
};
Util.cancelDialog = function() {
  for (var i = 0; i < CanvasElementManagerCount; i++) {
    var mgr = CanvasElementManagerReferences[i];
    mgr.hideDialog();
  }
};
Util.showDialog = function(dialog_type, params, builder) {
  if (builder === undefined) builder = new CanvasElements.Dialog.Builder();
  var mgr;
  for (var i = 0; i < CanvasElementManagerCount; i++) {
    var mgr = CanvasElementManagerReferences[i];
    if (mgr.enabled) {
      builder = new CanvasElements.Dialog.Builder(mgr);
      break;
    }
  }
  switch (dialog_type) {
    case DialogType.NoInternet:
      builder
        .setPositiveButton(tm_strings[lang]["dialog_ok"])
        .setTitle(tm_strings[lang]["dialog_title_failed"])
        .setMessage(tm_strings[lang]["dialog_no_internet"])
        .setIcon(String.fromCharCode(59534))
        .setNegativeButton(tm_strings[lang]["dialog_retry"])
        .setNegativeAction(params)
        .show();
      break;
    case DialogType.NotLoggedIn:
      builder
        .setPositiveButton(tm_strings[lang]["dialog_ok"])
        .setTitle(tm_strings[lang]["dialog_title_failed"])
        .setMessage(tm_strings[lang]["dialog_no_session"])
        .setIcon(String.fromCharCode(59534))
        .setNegativeButton(tm_strings[lang]["dialog_retry"])
        .setNegativeAction(params)
        .show();
      break;
    case DialogType.Loading:
      var dialog_new_panel = new CanvasElements.Panel({
        x: 0,
        y: 0,
        w: 130,
        h: 24 + 16 + 16,
        type: PanelType.None,
        backcolor: "#FFF",
        padding_bottom: 0
      });
      dialog_new_panel.add(
        new CanvasElements.Spinner({
          gravity: Gravity.Left,
          gravity2: Gravity.CenterVertical,
          w: 24,
          h: 24
        })
      );
      dialog_new_panel.add(
        new CanvasElements.Label({
          text: tm_strings[lang]["loading"],
          x: 24 + 16 + 16,
          h: 12,
          padding: 0,
          gravity: Gravity.CenterVertical
        })
      );
      builder
        .setPanel(dialog_new_panel)
        .setMessage("")
        .setCancelable(false)
        .show();
      break;
  }
};
Util.shadow = function(ctx, elevation, drawstuff, alpha_override) {
  //based on Material Design specs
  if (alpha_override === undefined) alpha_override = 1;
  var first = {
    y_offset: [0, 1, 3, 10, 14, 19],
    blur: [0, 3, 6, 20, 28, 38],
    alpha: [0, 0.12, 0.16, 0.19, 0.25, 0.3]
  };
  var second = {
    y_offset: [0, 1, 3, 6, 10, 15],
    blur: [0, 2, 6, 6, 10, 12],
    alpha: [0, 0.24, 0.23, 0.23, 0.22, 0.22]
  };
  ctx.shadowOffsetY = getFrac(first.y_offset, elevation);
  ctx.shadowBlur = getFrac(first.blur, elevation);
  ctx.shadowColor =
    "rgba(0, 0, 0, " +
    getFrac(first.alpha, elevation) * alpha_override * 0.6 +
    ")";
  drawstuff();

  ctx.shadowOffsetY = getFrac(second.y_offset, elevation);
  ctx.shadowBlur = getFrac(second.blur, elevation);
  ctx.shadowColor =
    "rgba(0, 0, 0, " +
    getFrac(second.alpha, elevation) * alpha_override * 0.6 +
    ")";
  drawstuff();

  Util.resetShadow(ctx);

  function getFrac(array, frac) {
    return (
      array[Math.floor(frac)] +
      (frac - Math.floor(frac)) *
        (array[Math.ceil(frac)] - array[Math.floor(frac)])
    );
  }
};
Util.setShadow1 = function(ctx, elevation, alpha_override) {
  //based on Material Design specs
  if (alpha_override === undefined) alpha_override = 1;
  var first = {
    y_offset: [0, 1, 3, 10, 14, 19],
    blur: [0, 3, 6, 20, 28, 38],
    alpha: [0, 0.12, 0.16, 0.19, 0.25, 0.3]
  };
  ctx.shadowOffsetY = getFrac(first.y_offset, elevation);
  ctx.shadowBlur = getFrac(first.blur, elevation);
  ctx.shadowColor =
    "rgba(0, 0, 0, " +
    getFrac(first.alpha, elevation) * alpha_override * 0.6 +
    ")";

  function getFrac(array, frac) {
    return (
      array[Math.floor(frac)] +
      (frac - Math.floor(frac)) *
        (array[Math.ceil(frac)] - array[Math.floor(frac)])
    );
  }
};
Util.setShadow2 = function(ctx, elevation, alpha_override) {
  //based on Material Design specs
  if (alpha_override === undefined) alpha_override = 1;
  var second = {
    y_offset: [0, 1, 3, 6, 10, 15],
    blur: [0, 2, 6, 6, 10, 12],
    alpha: [0, 0.24, 0.23, 0.23, 0.22, 0.22]
  };
  ctx.shadowOffsetY = getFrac(second.y_offset, elevation);
  ctx.shadowBlur = getFrac(second.blur, elevation);
  ctx.shadowColor =
    "rgba(0, 0, 0, " +
    getFrac(second.alpha, elevation) * alpha_override * 0.6 +
    ")";

  function getFrac(array, frac) {
    return (
      array[Math.floor(frac)] +
      (frac - Math.floor(frac)) *
        (array[Math.ceil(frac)] - array[Math.floor(frac)])
    );
  }
};
Util.resetShadow = function(ctx) {
  ctx.shadowOffsetY = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowBlur = 0;
  ctx.shadowColor = "rgba(0, 0, 0, 0)";
};
Util.roundRect = function(ctx, x, y, w, h, radius, fill, stroke, do_not_close) {
  if (typeof stroke === "undefined") {
    stroke = false;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  var pts = [];
  pts.push({ x: x, y: y });
  pts.push({ x: x + w, y: y });
  pts.push({ x: x + w, y: y + h });
  pts.push({ x: x, y: y + h });
  Util.roundedShape(ctx, pts, radius, fill, stroke, do_not_close);
};
Util.roundRectBezier = function(
  ctx,
  x,
  y,
  width,
  height,
  radius,
  fill,
  stroke
) {
  if (typeof stroke === "undefined") {
    stroke = false;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  if (typeof radius === "number") {
    radius = { tl: radius, tr: radius, br: radius, bl: radius };
  } else {
    var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius.br,
    y + height
  );
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
};
Util.roundedShape = function(ctx, pts, radius, fill, stroke, do_not_close) {
  var debugC = [];
  ctx.beginPath();
  for (var i = 0; i < pts.length; i++) {
    //#szamolas o jeee
    var A = pts[i === 0 ? pts.length - 1 : i - 1];
    var B = pts[i];
    var C = pts[i === pts.length - 1 ? 0 : i + 1];
    var alpha = Math.abs(
      Math.atan2(C.x - B.x, C.y - B.y) - Math.atan2(A.x - B.x, A.y - B.y)
    );
    var d = Math.abs(radius / Math.sin(alpha / 2));
    var BC = -Math.atan2(C.y - B.y, C.x - B.x);
    var BA = -Math.atan2(A.y - B.y, A.x - B.x);
    if (BC < 0) BC += Math.PI * 2;
    if (BA < 0) BA += Math.PI * 2;
    if (BC < BA && BA - Math.PI > BC) BC += 2 * Math.PI;
    else if (BA < BC && BC - Math.PI > BA) BA += 2 * Math.PI;
    var mid = Math.abs(BC - BA) / 2;
    var beta = (BC <= BA ? BA : BC) - mid;
    var isLeft = false;
    var c = {
      x: B.x + d * Math.cos(beta),
      y: B.y - d * Math.sin(beta)
    };
    //TODO nomal actual center calculation (this is an approximation)
    var center = {
      x: (A.x + B.x + C.x) / 3,
      y: (A.y + B.y + C.y) / 3
    };
    var len = Math.sqrt(Math.pow(B.x - c.x, 2) + Math.pow(B.y - c.y, 2));
    var len_center = Math.sqrt(
      Math.pow(B.x - center.x, 2) + Math.pow(B.y - center.y, 2)
    );
    if (len > len_center) {
      c = center;
      len = len_center;
    }
    var nBC = Math.atan2(C.y - B.y, C.x - B.x);
    var nBA = Math.atan2(A.y - B.y, A.x - B.x);
    var startAngle = BC > BA ? nBA + Math.PI / 2 : nBA - Math.PI / 2;
    var finishAngle = BC > BA ? nBC - Math.PI / 2 : nBC + Math.PI / 2; //startAngle + (Math.PI - alpha);
    var dist = len * Math.cos(mid);
    var pt = {
      x: B.x + dist * Math.cos(BA),
      y: B.y - dist * Math.sin(BA)
    };

    //if (i === 0) ctx.moveTo(pt.x, pt.y);
    //else ctx.lineTo(pt.x, pt.y);
    ctx.arc(c.x, c.y, radius, startAngle, finishAngle, BC < BA);
    debugC.push({
      cx: c.x,
      cy: c.y
    });
  }
  if (!do_not_close) ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
};

var L = {};
L.showComments = false;
L.i = function(msg, script, row) {
  if (script === undefined) script = new Error().fileName;

  debug.push(
    (L.showComments
      ? "[INFO]" +
        (script !== undefined ? "[" + script + ".js]" : "") +
        (row !== undefined ? "[row " + row + "]" : "") +
        ": "
      : "") + msg
  );
};
L.w = function(msg, script, row) {
  if (script === undefined) script = new Error().fileName;
  debug.push(
    "[WARNING]" +
      (script !== undefined ? "[" + script + ".js]" : "") +
      (row !== undefined ? "[row " + row + "]" : "") +
      ": " +
      msg
  );
};
L.e = function(msg, script, row) {
  if (script === undefined) script = new Error().fileName;
  debug.push(
    "[ERROR]" +
      (script !== undefined ? "[" + script + ".js]" : "") +
      (row !== undefined ? "[row " + row + "]" : "") +
      ": " +
      msg
  );
};

var Mouse = (window.Mouse = {
  x: 0,
  y: 0,
  left_pressed: false,
  right_pressed: false,
  middle_pressed: false,
  scroll_top: 0,
  scroll_left: 0
});
var Keyboard = (window.Keyboard = {
  pressed_key: 0,
  shift: false,
  control: false
});
document.addEventListener("mousedown", function(e) {
  switch (e.button) {
    case 0:
      Mouse.left_pressed = true;
      break;
    case 1:
      Mouse.middle_pressed = true;
      break;
    case 2:
      Mouse.right_pressed = true;
      break;
  }
  Mouse.x = e.clientX;
  Mouse.y = e.clientY;
});
document.addEventListener("mouseup", function(e) {
  switch (e.button) {
    case 0:
      Mouse.left_pressed = false;
      break;
    case 1:
      Mouse.middle_pressed = false;
      break;
    case 2:
      Mouse.right_pressed = false;
      break;
  }
  Mouse.x = e.clientX;
  Mouse.y = e.clientY;
});
document.addEventListener("mousemove", function(e) {
  Mouse.x = e.clientX;
});
document.addEventListener("keydown", function(e) {
  switch (e.keyCode) {
    case 17:
      Keyboard.control = true;
      break;
    case 16:
      Keyboard.shift = true;
      break;
  }
  Keyboard.pressed_key = e.keyCode;
});
document.addEventListener("keyup", function(e) {
  switch (e.keyCode) {
    case 17:
      Keyboard.control = false;
      break;
    case 16:
      Keyboard.shift = false;
      break;
  }
  if (e.keyCode == Keyboard.pressed_key) Keyboard.pressed_key = 0;
});
function isset(val) {
  if (val === undefined || val === null || val === "") {
    return false;
  } else {
    return true;
  }
}
