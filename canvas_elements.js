/* global Colors, debug, Util */

var Util = {};
/**
 * A tool used for animating a value from 0 to 1 within a given interval.
 * 
 * @param {timer} timer
 * @param {interpolator} interpolator
 * @param {number} duration
 * @param {function} callback
 * @param {function} callbackOnFinish
 * @param {number} offset
 */
Util.animate = function (timer, interpolator, duration, callback, callbackOnFinish, offset, no_paint_reqest) {
    if (no_paint_reqest === undefined)
        no_paint_reqest = false;
    if (NO_ANIMATION) {
        duration = 1;
        offset = 0;
    }
    window.clearInterval(timer);
    var timed_out = false;
    if (offset !== undefined && offset > 0) {
        setTimeout(function () {
            timed_out = true;
        }, offset);
    } else
        timed_out = true;
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
                if (callback !== undefined)
                    callback(fraction);
                if (callbackOnFinish !== undefined && typeof callbackOnFinish == "function")
                    callbackOnFinish();
                if (!no_paint_reqest) {
                    Util.animating = false;
                }
            } else {
                if (callback !== undefined)
                    callback(fraction);
                if (!no_paint_reqest) {
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
Util.accelerateDecelerateInterpolator = function (t) {
    var value = 0;
    if (t <= 0.5)
        value = Math.pow(t * 2, Util.interpolationWeight) / 2;
    else
        value = 0.5 + (1 - Math.pow(2 - t * 2, Util.interpolationWeight)) / 2;
    return value;
};
Util.assymetricInterpolator = function (t) {
    var value = 0;
    var r = Util.assymetricRatio;
    var x = t;
    if (t <= Util.assymetricRatio)
        value = accelerateInterpolator(t / Util.assymetricRatio) * Util.assymetricRatio;
    else
        value = (1 - r) * (1 - Math.pow((1 / (1 - r) * (1 - x)), Util.interpolationWeight)) + r;
    return value;
};
Util.decelerateInterpolator = function (t) {
    return 1 - Math.pow(1 - t, Util.interpolationWeight);
};
Util.accelerateInterpolator = function (t) {
    return Math.pow(t, Util.interpolationWeight);
};
Util.linearInterpolator = function (t) {
    return t;
};
Util.cancelDialog = function () {
    for (var i = 0; i < CanvasElementManagerCount; i++) {
        var mgr = CanvasElementManagerReferences[i];
        mgr.hideDialog();
    }
};
Util.showDialog = function (dialog_type, params, builder) {
    if (builder === undefined)
        builder = new CanvasElements.Dialog.Builder();
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
            dialog_new_panel.add(new CanvasElements.Spinner({
                gravity: Gravity.Left,
                gravity2: Gravity.CenterVertical,
                w: 24,
                h: 24
            }));
            dialog_new_panel.add(new CanvasElements.Label({
                text: tm_strings[lang]["loading"],
                x: 24 + 16 + 16,
                h: 12,
                padding: 0,
                gravity: Gravity.CenterVertical
            }));
            builder
                    .setPanel(dialog_new_panel)
                    .setMessage("")
                    .setCancelable(false)
                    .show();
            break;
    }
};
Util.shadow = function (ctx, elevation, drawstuff, alpha_override) {
    //based on Material Design specs
    if (alpha_override === undefined)
        alpha_override = 1;
    var first = {
        y_offset: [0, 1, 3, 10, 14, 19],
        blur: [0, 3, 6, 20, 28, 38],
        alpha: [0, 0.12, 0.16, 0.19, 0.25, 0.30]
    };
    var second = {
        y_offset: [0, 1, 3, 6, 10, 15],
        blur: [0, 2, 6, 6, 10, 12],
        alpha: [0, 0.24, 0.23, 0.23, 0.22, 0.22]
    };
    ctx.shadowOffsetY = getFrac(first.y_offset, elevation);
    ctx.shadowBlur = getFrac(first.blur, elevation);
    ctx.shadowColor = "rgba(0, 0, 0, " + (getFrac(first.alpha, elevation) * alpha_override * 0.6) + ")";
    drawstuff();

    ctx.shadowOffsetY = getFrac(second.y_offset, elevation);
    ctx.shadowBlur = getFrac(second.blur, elevation);
    ctx.shadowColor = "rgba(0, 0, 0, " + (getFrac(second.alpha, elevation) * alpha_override * 0.6) + ")";
    drawstuff();

    Util.resetShadow(ctx);

    function getFrac(array, frac) {
        return array[Math.floor(frac)] + ((frac - Math.floor(frac)) * (array[Math.ceil(frac)] - array[Math.floor(frac)]));
    }
    ;
};
Util.setShadow1 = function (ctx, elevation, alpha_override) {
    //based on Material Design specs
    if (alpha_override === undefined)
        alpha_override = 1;
    var first = {
        y_offset: [0, 1, 3, 10, 14, 19],
        blur: [0, 3, 6, 20, 28, 38],
        alpha: [0, 0.12, 0.16, 0.19, 0.25, 0.30]
    };
    ctx.shadowOffsetY = getFrac(first.y_offset, elevation);
    ctx.shadowBlur = getFrac(first.blur, elevation);
    ctx.shadowColor = "rgba(0, 0, 0, " + (getFrac(first.alpha, elevation) * alpha_override * 0.6) + ")";

    function getFrac(array, frac) {
        return array[Math.floor(frac)] + ((frac - Math.floor(frac)) * (array[Math.ceil(frac)] - array[Math.floor(frac)]));
    }
};
Util.setShadow2 = function (ctx, elevation, alpha_override) {
    //based on Material Design specs
    if (alpha_override === undefined)
        alpha_override = 1;
    var second = {
        y_offset: [0, 1, 3, 6, 10, 15],
        blur: [0, 2, 6, 6, 10, 12],
        alpha: [0, 0.24, 0.23, 0.23, 0.22, 0.22]
    };
    ctx.shadowOffsetY = getFrac(second.y_offset, elevation);
    ctx.shadowBlur = getFrac(second.blur, elevation);
    ctx.shadowColor = "rgba(0, 0, 0, " + (getFrac(second.alpha, elevation) * alpha_override * 0.6) + ")";

    function getFrac(array, frac) {
        return array[Math.floor(frac)] + ((frac - Math.floor(frac)) * (array[Math.ceil(frac)] - array[Math.floor(frac)]));
    }
};
Util.resetShadow = function (ctx) {
    ctx.shadowOffsetY = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowBlur = 0;
    ctx.shadowColor = "rgba(0, 0, 0, 0)";
};
Util.roundRect = function (ctx, x, y, w, h, radius, fill, stroke, do_not_close) {
    if (typeof stroke === 'undefined') {
        stroke = false;
    }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    var pts = [];
    pts.push({x: x, y: y});
    pts.push({x: x + w, y: y});
    pts.push({x: x + w, y: y + h});
    pts.push({x: x, y: y + h});
    Util.roundedShape(ctx, pts, radius, fill, stroke, do_not_close);
};
Util.roundRectBezier = function (ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === 'undefined') {
        stroke = false;
    }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    if (typeof radius === 'number') {
        radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
        var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
        for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
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
Util.roundedShape = function (ctx, pts, radius, fill, stroke, do_not_close) {
    var debugC = [];
    ctx.beginPath();
    for (var i = 0; i < pts.length; i++) {
        //#szamolas o jeee
        var A = pts[i === 0 ? pts.length - 1 : i - 1];
        var B = pts[i];
        var C = pts[i === pts.length - 1 ? 0 : i + 1];
        var alpha = Math.abs(Math.atan2(C.x - B.x, C.y - B.y) - Math.atan2(A.x - B.x, A.y - B.y));
        var d = Math.abs(radius / Math.sin(alpha / 2));
        var BC = (-Math.atan2(C.y - B.y, C.x - B.x));
        var BA = (-Math.atan2(A.y - B.y, A.x - B.x));
        if (BC < 0)
            BC += Math.PI * 2;
        if (BA < 0)
            BA += Math.PI * 2;
        if (BC < BA && BA - Math.PI > BC)
            BC += 2 * Math.PI;
        else if (BA < BC && BC - Math.PI > BA)
            BA += 2 * Math.PI;
        var mid = (Math.abs(BC - BA) / 2);
        var beta = (BC <= BA ? BA : BC) - mid;
        var isLeft = false;
        var c = {
            x: B.x + (d * Math.cos(beta)),
            y: B.y - (d * Math.sin(beta))
        };
        //TODO nomal actual center calculation (this is an approximation)
        var center = {
            x: (A.x + B.x + C.x) / 3,
            y: (A.y + B.y + C.y) / 3
        };
        var len = Math.sqrt(Math.pow(B.x - c.x, 2) + Math.pow(B.y - c.y, 2));
        var len_center = Math.sqrt(Math.pow(B.x - center.x, 2) + Math.pow(B.y - center.y, 2));
        if (len > len_center) {
            c = center;
            len = len_center;
        }
        var nBC = (Math.atan2(C.y - B.y, C.x - B.x));
        var nBA = (Math.atan2(A.y - B.y, A.x - B.x));
        var startAngle = BC > BA ? (nBA + (Math.PI / 2)) : (nBA - (Math.PI / 2));
        var finishAngle = BC > BA ? (nBC - (Math.PI / 2)) : (nBC + (Math.PI / 2));//startAngle + (Math.PI - alpha);
        var dist = len * Math.cos(mid);
        var pt = {
            x: B.x + (dist * Math.cos(BA)),
            y: B.y - (dist * Math.sin(BA))
        };

        //if (i === 0) ctx.moveTo(pt.x, pt.y);
        //else ctx.lineTo(pt.x, pt.y);
        ctx.arc(c.x, c.y, radius, startAngle, finishAngle, BC < BA);
        debugC.push({
            cx: c.x,
            cy: c.y
        });
    }
    if (!do_not_close)
        ctx.closePath();
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }
};

var CanvasElementManagerReferences = [];
var CanvasElementManagerCount = 0;
var CanvasElements = {};
var Dropdown = {};
var Spinner = {};
var Toast = {};
function CanvasElementManager(canvas_param, no_events) {
    if (no_events === undefined)
        no_events = false;
    var ctx;
    if (canvas_param !== undefined)
        ctx = canvas_param.getContext("2d");
    if (!no_events)
        this.ID = CanvasElementManagerCount++;
    var canvas = canvas_param;
    this.state = "none";
    this.elements = [];
    //syntax: -1 if none is selected, 0->n index if selected
    this.focus_index = -1;
    this.ismenuactive = false;
    this.enabled = true;
    this.dialog_open = false;
    this.toast = new ToastInstance(canvas);
    this.toast.manager = this;

    this.tooltip = new Tooltip();
    var tooltip_time = 2000;
    var tooltip_timer;
    var tooltip_index = -1;
    var mouse_x = 0;
    var mouse_y = 0;
    var mouse_clicked = false;
    CanvasElementManager.canvasfont = NO_CACHE ? "sans-serif" : "Roboto";
    CanvasElementManager.showlayoutbounds = LAYOUT_BOUNDS;
    CanvasElementManager.accentcolor = Colors.red_A200;
    CanvasElementManager.maincolor = Colors.bluegrey_500;
    this.dialog;

    if (!no_events) {
        //initialize section
        document.addEventListener("keydown", function (evt) {
            if (this.enabled)
                this.onKeyDown(evt);
        }.bind(this), false);
        document.addEventListener("keypress", function (evt) {
            if (this.enabled)
                this.onKeyPress(evt);
        }.bind(this), false);
        document.addEventListener("keyup", function (evt) {
            if (this.enabled)
                this.onKeyUp(evt);
        }.bind(this), false);
        document.addEventListener('mousedown', function (evt) {
            mouse_x = evt.clientX - canvas.getBoundingClientRect().left;
            mouse_y = evt.clientY - canvas.getBoundingClientRect().top;
            mouse_clicked = true;
            if (this.enabled)
                this.onMouseDown(evt);
        }.bind(this), false);
        document.addEventListener("mousemove", function (evt) {
            mouse_x = evt.clientX - canvas.getBoundingClientRect().left;
            mouse_y = evt.clientY - canvas.getBoundingClientRect().top;
            if (this.enabled)
                this.onMouseMove(evt);
        }.bind(this), false);
        document.addEventListener('mouseup', function (evt) {
            mouse_x = evt.clientX - canvas.getBoundingClientRect().left;
            mouse_y = evt.clientY - canvas.getBoundingClientRect().top;
            mouse_clicked = false;
            if (this.enabled)
                this.onMouseUp(evt);
        }.bind(this), false);
        document.addEventListener('wheel', function (evt) {
            if (this.enabled)
                this.onScroll(evt);
        }.bind(this), false);
    }

    this.assignCanvas = function (new_canvas) {
        canvas = new_canvas;
        ctx = canvas.getContext("2d");
    };
    this.paint = function (a) {
        this.paint_needed = false;
        CanvasElementManager.paint_needed = false;

        for (var i = 0; i < this.elements.length; i++) {
            if (this.elements[i].paint !== undefined && !this.elements[i].isopenmenu)
                this.elements[i].paint(a);
        }
        for (var i = 0; i < this.elements.length; i++) {
            if (this.elements[i].paint !== undefined && this.elements[i].isopenmenu)
                this.elements[i].paint(a);
        }
        if (this.dialog !== undefined) {
            if (this.dialog.paint !== undefined) {
                this.dialog.paint(a);
            }
        }

        for (var i = 0; i < this.elements.length; i++) {
            if (CanvasElementManager.showlayoutbounds && !this.elements[i].hidden) {
                drawLayoutBounds(this.elements[i]);
            }
        }

        this.toast.paint(a);
        //TODO fix tooltip bugs
        //this.tooltip.paint();
    };
    this.add = function (element) {
        element.manager = this;
        element.parent = this;
        element.index = this.elements.length;
        this.elements.push(element);
        requestPaint();
    };
    this.remove = function (element) {
        var index = this.elements.indexOf(element);
        if (index > -1)
            this.elements.splice(index, 1);
        requestPaint();
    };
    this.removeDialog = function () {
        for (var i = 0; i < this.elements.length; i++) {
            if (this.elements[i].constructor.name === "Dialog") {
                this.elements.splice(i, 1);
            }
        }
        requestPaint();
    };
    this.hideDialog = function () {
        for (var i = 0; i < this.elements.length; i++) {
            if (this.elements[i].constructor.name === "Dialog") {
                this.elements[i].forceHide();
            }
        }
    };
    this.focusElement = function (element) {
        if (element.focused)
            return null;
        element.focused = true;
        this.focus_index = element.index;
        if (element.onFocus !== undefined) {
            element.onFocus();
        }
        requestPaint();
    };
    this.defocusElement = function (element) {
        if (!element.focused)
            return null;
        element.focused = false;
        if (element.onDefocus !== undefined)
            element.onDefocus();
        requestPaint();
    };
    this.defocusAll = function () {
        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].focused = false;
            if (this.elements[i].onDefocus !== undefined)
                this.elements[i].onDefocus();
        }
        requestPaint();
    };
    this.onKeyDown = function (e) {
        if (this.elements[this.focus_index] !== undefined && this.elements[this.focus_index].onKeyDown !== undefined) {
            this.elements[this.focus_index].onKeyDown(e);
        }
    };
    this.onKeyPress = function (e) {
        if (this.elements[this.focus_index] !== undefined && this.elements[this.focus_index].onKeyPress !== undefined) {
            this.elements[this.focus_index].onKeyPress(e);
        }
    };
    this.onKeyUp = function (e) {
        if (this.elements[this.focus_index] !== undefined && this.elements[this.focus_index].onKeyUp !== undefined) {
            this.elements[this.focus_index].onKeyUp(e);
        }
    };
    this.onMouseDown = function (e) {
        this.tooltip.hide();
        var intersected = false;
        this.ismenuactive = false;
        if (this.dialog !== undefined)
            this.ismenuactive = this.ismenuactive || this.dialog.isopenmenu;
        for (var i = 0; i < this.elements.length; i++) {
            this.ismenuactive = this.ismenuactive || this.elements[i].isopenmenu;
        }
        for (var i = 0; i < this.elements.length; i++) {
            if (intersectsMouse(this.elements[i].x, this.elements[i].y, this.elements[i].w, this.elements[i].h) && !this.elements[i].hidden
                    && (!this.ismenuactive || this.elements[i].isopenmenu)) {
                this.focusElement(this.elements[i]);
                intersected = true;
                if (this.elements[i].onMouseDown !== undefined)
                    this.elements[i].onMouseDown(e);
            } else {
                if (this.elements[i].focused && (!(this.elements[i] instanceof CanvasElements.Panel) || !this.ismenuactive))
                    this.defocusElement(this.elements[i]);
            }
        }
        if (!intersected) {
            this.focus_index = -1;
        }

        requestPaint();
    };
    this.onMouseUp = function (e) {
        this.tooltip.hide();
        var intersected = false;
        this.ismenuactive = false;
        for (var i = 0; i < this.elements.length; i++) {
            this.ismenuactive = this.ismenuactive || this.elements[i].isopenmenu;
        }
        for (var i = 0; i < this.elements.length; i++) {
            if ((intersectsMouse(this.elements[i].x, this.elements[i].y, this.elements[i].w, this.elements[i].h)
                    && (!this.ismenuactive || this.elements[i].isopenmenu)) || this.elements[i] instanceof CanvasElements.RadioGroup) {
                this.focusElement(this.elements[i]);
                intersected = true;
                if (this.elements[i].onMouseUp !== undefined)
                    this.elements[i].onMouseUp(e);
            } else {
                if (this.elements[i].focused && (!(this.elements[i] instanceof CanvasElements.Panel) || !this.ismenuactive))
                    this.defocusElement(this.elements[i]);
            }
        }
        if (!intersected)
        {
            this.focus_index = -1;
        }

        requestPaint();
    };
    this.onMouseMove = function (e) {
        var intersected = false;
        for (var i = 0; i < this.elements.length; i++) {
            if (intersectsMouse(this.elements[i].x, this.elements[i].y, this.elements[i].w, this.elements[i].h) && !mouse_clicked) {

                intersected = true;
                if (tooltip_index !== i) {
                    window.clearTimeout(tooltip_timer);
                    tooltip_index = i;
                    var text = this.elements[i].getTooltip();
                    tooltip_timer = window.setTimeout(function () {
                        this.tooltip.new(text);
                    }.bind(this), tooltip_time);
                    break;
                }
            }
        }
        for (var i = 0; i < this.elements.length; i++) {
            if (this.elements[i].onMouseMove !== undefined)
                this.elements[i].onMouseMove(e);
        }
        if (!intersected) {
            window.clearTimeout(tooltip_timer);
            this.tooltip.hide();
            tooltip_index = -1;
        }
    };
    this.onScroll = function (e) {
        if (this.elements[this.focus_index] !== undefined && this.elements[this.focus_index].onScroll !== undefined) {
            this.elements[this.focus_index].onScroll(e);
        }
    };
    this.disable = function () {
        this.enabled = false;
        for (var i = 0; i < this.elements.length; i++) {
            this.defocusElement(this.elements[i].isopenmenu);
        }
    };
    this.enable = function () {
        this.enabled = true;
    };


    //TODO default width and height for elements
    //TODO rounded rectangle in all elements and corner property (default: 3)
    //TODO unite fill and stroke notation in all elements
    //TODO move properties to global if CAN
    //element initializer
    CanvasElements.Element = function Element(obj, p) {
        obj.x = (typeof p.x == 'undefined') ? 0 : p.x;
        obj.y = (typeof p.y == 'undefined') ? 0 : p.y;
        obj.w = (typeof p.w == 'undefined') ? 90 : p.w;
        obj.h = (typeof p.h == 'undefined') ? 20 : p.h;
        obj.parent = p.parent;
        obj.focused = false;
        obj.backcolor = (typeof p.backcolor == 'undefined') ? "#FFF" : p.backcolor;
        obj.strokecolor = (typeof p.strokecolor == 'undefined') ? "#000" : p.strokecolor;
        obj.noborders = (typeof p.noborders == 'undefined') ? false : p.noborders;
        obj.font = (typeof p.font == 'undefined') ? ("12px " + CanvasElementManager.canvasfont) : p.font;
        obj.textcolor = (typeof p.textcolor == 'undefined') ? "rgba(0, 0, 0, 0.87)" : p.textcolor;
        obj.corner = (typeof p.corner == 'undefined') ? 3 : p.corner;
        obj.elevation = (typeof p.elevation == 'undefined') ? 2 : p.elevation;
        obj.gravity = (typeof p.gravity == 'undefined') ? Gravity.None : p.gravity;
        obj.gravity2 = (typeof p.gravity2 == 'undefined') ? Gravity.None : p.gravity2;
        obj.hidden = (typeof p.hidden == 'undefined') ? false : p.hidden;
        obj.enabled = (typeof p.enabled == 'undefined') ? true : p.enabled;
        obj.divider_top = (typeof p.divider_top == 'undefined') ? false : p.divider_top;
        obj.divider_bottom = (typeof p.divider_bottom == 'undefined') ? false : p.divider_bottom;
        obj.divider_right = (typeof p.divider_right == 'undefined') ? false : p.divider_right;
        obj.divider_left = (typeof p.divider_left == 'undefined') ? false : p.divider_left;
        obj.divider_color = (typeof p.divider_color == 'undefined') ? "rgba(0, 0, 0, 0.3)" : p.divider_color;
        obj.margin_top = (typeof p.margin_top == 'undefined') ? 0 : p.margin_top;
        obj.margin_bottom = (typeof p.margin_bottom == 'undefined') ? 0 : p.margin_bottom;
        obj.margin_right = (typeof p.margin_right == 'undefined') ? 0 : p.margin_right;
        obj.margin_left = (typeof p.margin_left == 'undefined') ? 0 : p.margin_left;
        obj.padding_top = (typeof p.padding_top == 'undefined') ? 0 : p.padding_top;
        obj.padding_bottom = (typeof p.padding_bottom == 'undefined') ? 0 : p.padding_bottom;
        obj.padding_right = (typeof p.padding_right == 'undefined') ? 0 : p.padding_right;
        obj.padding_left = (typeof p.padding_left == 'undefined') ? 0 : p.padding_left;
        obj.isopenmenu = false;
        obj.toggleable = false;
        obj.isradio = false;
        obj.manager = p.manager;
        obj.below = p.below;
        obj.atop = p.atop;
        obj.torightof = p.torightof;
        obj.toleftof = p.toleftof;
        obj.additionalinfo = p.additionalinfo;
        obj.below_padding = (typeof p.below_padding == 'undefined') ? 16 : p.below_padding;
		obj.intersectsMouse = function() {
			return intersectsMouse(this.x, this.y, this.w, this.h);
		}
        obj.tooltip = (typeof p.tooltip == 'undefined') ? "_none" : p.tooltip;
        obj.getTooltip = function () {
            return obj.tooltip;
        };
        //rootManager.ismenuactive = this.isopenmenu;
    };
    //elements
    CanvasElements.Input = function Input(o) {
        if (o === null || o === undefined)
            o = {};
        CanvasElements.Element(this, o);
        this.stroke = "rgba(0, 0, 0, 1)";
        this.text = o.text === undefined ? "" : o.text;
        this.textcolor = o.textcolor === undefined ? "rgba(0, 0, 0, 0.87)" : o.textcolor;
        this.hint = o.hint === undefined ? "" : o.hint;
        this.font = o.font === undefined ? ("12px " + CanvasElementManager.canvasfont) : o.font;
        this.ellipsize = o.ellipsize === undefined ? true : o.ellipsize;
        this.ellipsizetext = o.ellipsizetext === undefined ? "..." : o.ellipsizetext;
        this.selectioncolor = o.selectioncolor === undefined ? "#000" : o.selectioncolor;
        this.userselectable = o.userselectable === undefined ? true : o.userselectable;
        this.allowedcharacters = o.allowedcharacters === undefined ? "all" : o.allowedcharacters;
        this.cursor = o.cursor === undefined ? "text" : o.cursor;
        this.selectonfocus = o.selectonfocus === undefined ? true : o.selectonfocus;
        this.fullheightselection = o.fullheightselection === undefined ? false : o.fullheightselection;
        this.onTextChange = o.onTextChange === undefined ? function () {
        } : o.onTextChange;
        this.onTextEnter = o.onTextEnter === undefined ? function () {
        } : o.onTextEnter;
        this.minvalue = o.minvalue === undefined ? 0 : o.minvalue;
        this.maxvalue = o.maxvalue === undefined ? Number.MAX_VALUE : o.maxvalue;

        var select_start = 0;
        var select_end = 0;
        var select_pos_atclick = 0;
        var cursor_position = 0;
        var cursor_visible = true;
        var cursor_visible_override = false;
        var cursor_flash_length = 530;
        var cursor_timer;
        var offsetX = 0;
        function flash() {
            cursor_visible = !cursor_visible;
            requestPaint();
        }
        var tX = 0;
        var tY = 0;
        var timeout = null;
        var prev_cursor_pos = 0;
        var section_selected = false;

        var old_text = "";
        this.paint = function (a) {
            if (this.hidden)
                return null;
            if (a === undefined)
                a = 1;
            if (old_text !== this.text)
                this.onTextChange();
            //body
            ctx.globalAlpha = 1 * a;
            ctx.font = this.font;
            ctx.fillStyle = this.enabled ? this.backcolor : "rgba(0, 0, 0, 0.12)";
            ctx.save();
            roundRect(this.x + 0.5, this.y + 0.5, this.w, this.h, 2, true, false);


            if (this.stroke !== undefined) {
                ctx.strokeStyle = this.stroke;
                ctx.lineWidth = 1;
                ctx.globalAlpha = this.focused ? 0.87 * a : 0.3 * a;
                ctx.stroke();
                ctx.globalAlpha = 1 * a;
            }

            ctx.beginPath();
            ctx.rect(this.x + 0.5, this.y + 0.5, this.w, this.h);
            ctx.clip();

            //text
            tX = this.x + 12 / 2;
            tY = this.y + this.h / 2 + 5;
            ctx.fillStyle = this.enabled ? this.textcolor : "rgba(0, 0, 0, 0.54)";
            if (this.focused) {
                ctx.fillText(this.text, Math.round(tX + offsetX), Math.round(tY));
            } else {
                var txt = "";
                if (this.ellipsize) {
                    ctx.font = this.font;
                    var ellip_w = ctx.measureText(this.ellipsizetext).width;
                    var arr = this.text.split('');
                    var position = -1;
                    for (var i = 0; i < arr.length; i++) {
                        arr.splice(i, this.text.length - i);
                        var measureTxt = arr.join("");
                        var width = ctx.measureText(measureTxt).width;
                        if (width + 12 + ellip_w > this.w) {
                            position = i - 1;
                            break;
                        } else {
                            arr = this.text.split('');
                        }
                    }
                    txt = arr.join("") + (position === -1 ? "" : this.ellipsizetext);
                } else
                    txt = this.text;
                ctx.globalAlpha = 0.87 * a;
                ctx.fillText(txt, Math.round(tX), Math.round(tY));
            }
            //hint
            if (this.text === "" && this.hint !== undefined) {
                ctx.globalAlpha = 0.54 * a;
                ctx.fillText(this.hint, Math.round(tX), Math.round(tY));
            }
            ctx.globalAlpha = 1;
            //cursor
            var arr = this.text.split('');
            arr.splice(cursor_position, this.text.length - cursor_position);
            var measureTxt = arr.join("");
            ctx.font = this.font;
            var cX = this.x + 12 / 2 + ctx.measureText(measureTxt).width;
            var cY = this.y + this.h / 2 - 6;
            if (this.focused && (cursor_visible || cursor_visible_override) && !section_selected) {
                ctx.globalAlpha = 0.87 * a;
                ctx.fillStyle = 'black';
                ctx.fillRect(Math.round(cX + offsetX), cY, 1, 12);
                ctx.globalAlpha = 1;
            }
            if (section_selected)
                window.clearInterval(cursor_timer);
            //draw selection
            if (this.userselectable) {
                var delta = cursor_position - select_pos_atclick;
                select_start = delta < 0 ? cursor_position : select_pos_atclick;
                select_end = delta < 0 ? select_pos_atclick : cursor_position;
                //section_selected = select_start - select_end !== 0;
            }
            if (this.focused && this.userselectable && section_selected) {
                ctx.globalAlpha = 0.2 * a;
                ctx.fillStyle = this.selectioncolor;
                var h = this.fullheightselection ? this.h : 16;
                ctx.fillRect(tX + ctx.measureText(this.text.substring(0, select_start)).width, this.y + this.h / 2 - h / 2, ctx.measureText(this.text.substring(select_start, select_end)).width, h);
                ctx.globalAlpha = 1;
            }
            old_text = this.text;
            /*else {
             ctx.fillStyle = this.backcolor;
             ctx.fillRect(Math.round(cX + offsetX), cY, 1, 12);
             }*/
            ctx.restore();
        };
        //TODO ctrl + a, double click, triple click, shift + arrows
        var backspace = false;
        var justfocused = false;
        this.onMouseDown = function () {
            if (this.hidden || !this.enabled)
                return null;
            if (justfocused) {
                justfocused = false;
                return null;
            }
            if (!Keyboard.shift)
                this.clearSelection();
            cursor_visible = true;
            window.clearInterval(cursor_timer);
            cursor_timer = window.setInterval(function () {
                flash();
            }, cursor_flash_length);
            this.manager.focusElement(this);
            var arr = this.text.split('');
            var min_position = 0;
            var min_closeness = 100000;

            for (var i = 0; i < arr.length; i++) {
                arr.splice(i, this.text.length - i);
                var measureTxt = arr.join("");
                ctx.font = this.font;
                var width = ctx.measureText(measureTxt).width;
                if (Math.abs(mouse_x - (this.x + 6 + width + offsetX)) < min_closeness) {
                    min_closeness = Math.abs(mouse_x - (this.x + 6 + width + offsetX));
                    min_position = i;
                }
                arr = this.text.split('');
            }
            cursor_position = min_position;
            ctx.font = this.font;
            if (mouse_x > this.x + 6 + ctx.measureText(this.text).width + offsetX) {
                cursor_position++;
            }
            if (!Keyboard.shift && !section_selected)
                select_pos_atclick = cursor_position;
        };
        var intersected = false;
        this.onMouseMove = function () {
            if (this.hidden || !this.enabled)
                return null;
            prev_cursor_pos = cursor_position;
            if (mouse_clicked) {
                cursor_visible = true;
                cursor_visible_override = true;
                window.clearInterval(cursor_timer);
//                cursor_timer = window.setInterval(function () {
//                    flash();
//                }, cursor_flash_length);
                //this.manager.focusElement(this);
                var arr = this.text.split('');
                var min_position = 0;
                var min_closeness = 100000;

                for (var i = 0; i < arr.length; i++) {
                    arr.splice(i, this.text.length - i);
                    var measureTxt = arr.join("");
                    ctx.font = this.font;
                    var width = ctx.measureText(measureTxt).width;
                    if (Math.abs(mouse_x - (this.x + 6 + width + offsetX)) < min_closeness) {
                        min_closeness = Math.abs(mouse_x - (this.x + 6 + width + offsetX));
                        min_position = i;
                    }
                    arr = this.text.split('');
                }
                cursor_position = min_position;
                ctx.font = this.font;
                if (mouse_x > this.x + 6 + ctx.measureText(this.text).width + offsetX) {
                    cursor_position++;
                }
                if (prev_cursor_pos !== cursor_position)
                    requestPaint();

                if (this.userselectable) {
                    var delta = cursor_position - select_pos_atclick;
                    select_start = delta < 0 ? cursor_position : select_pos_atclick;
                    select_end = delta < 0 ? select_pos_atclick : cursor_position;
                    section_selected = select_start - select_end !== 0;
                }
            } else
                cursor_visible_override = false;

            if (intersectsMouse(this.x, this.y, this.w, this.h) && this.cursor !== undefined && !this.manager.ismenuactive) {
                $(canvas).css('cursor', this.cursor).css('cursor', "-webkit-" + this.cursor);
                intersected = true;
            } else if (this.cursor !== undefined && intersected) {
                $(canvas).css('cursor', 'auto');
                intersected = false;
            }
        };
        this.clearSelection = function () {
            select_start = 0;
            select_end = 0;
            select_pos_atclick = cursor_position;
            section_selected = false;
            requestPaint();
        };
        this.onKeyDown = function (e) {
            if (this.hidden || !this.enabled)
                return null;
            prev_cursor_pos = cursor_position;
            requestPaint();
            cursor_visible_override = true;
            window.clearTimeout(timeout);
            window.clearInterval(cursor_timer);
            timeout = window.setTimeout(function () {
                cursor_visible = true;
                cursor_visible_override = false;
                window.clearInterval(cursor_timer);
                cursor_timer = window.setInterval(function () {
                    flash();
                }, cursor_flash_length);
            }, 0);
            switch (e.keyCode) {
                //backspace
                case 8:
                    e.preventDefault();
                    if (section_selected) {
                        cursor_position = select_start;
                        var fir_part = this.text.substring(0, select_start);
                        var sec_part = this.text.substring(select_end, this.text.length);
                        this.text = fir_part + sec_part;
                        this.clearSelection();
                    } else {
                        if (cursor_position > 0) {
                            backspace = true;
                            var arr = this.text.split('');
                            arr.splice(cursor_position - 1, 1);
                            this.text = arr.join("");
                            cursor_position--;
                        }
                    }
                    break;
                    //del
                case 46:
                    e.preventDefault();
                    var arr = this.text.split('');
                    arr.splice(cursor_position, 1);
                    this.text = arr.join("");
                    break;
                    //end
                case 35:
                    if (Keyboard.shift && !section_selected) {
                        select_pos_atclick = cursor_position;
                        section_selected = true;
                    }
                    if (section_selected && !Keyboard.shift) {
                        cursor_position = select_start;
                        this.clearSelection();
                    }
                    ctx.font = this.font;
                    offsetX = ctx.measureText(this.text).width - this.w;
                    if (offsetX < 0)
                        offsetX = 0;
                    cursor_position = this.text.length;
                    break;
                    //home
                case 36:
                    if (Keyboard.shift && !section_selected) {
                        select_pos_atclick = cursor_position;
                        section_selected = true;
                    }
                    if (section_selected && !Keyboard.shift) {
                        cursor_position = select_start;
                        this.clearSelection();
                    }
                    offsetX = 0;
                    cursor_position = 0;
                    break;
                    //left
                case 37:
                    if (Keyboard.control) {
                        cursor_position = this.text.lastIndexOf(" ", cursor_position - 1);
                        if (cursor_position < 0)
                            cursor_position = 0;
                    } else {
                        if (Keyboard.shift && !section_selected) {
                            select_pos_atclick = cursor_position;
                            section_selected = true;
                        }

                        if (section_selected && !Keyboard.shift) {
                            cursor_position = select_start;
                            this.clearSelection();
                        } else
                            cursor_position--;
                    }
                    break;
                    //right
                case 39:
                    if (Keyboard.control) {
                        cursor_position = this.text.indexOf(" ", cursor_position + 1);
                        if (cursor_position < 0)
                            cursor_position = this.text.length;
                    } else {
                        if (Keyboard.shift && !section_selected) {
                            select_pos_atclick = cursor_position;
                            section_selected = true;
                        }

                        if (section_selected && !Keyboard.shift) {
                            cursor_position = select_end;
                            this.clearSelection();
                        } else
                            cursor_position++;
                    }
                    break;
                    //enter
                case 13:
                    rootManager.defocusElement(this);
                    break;
                    //a
                case 65:
                    if (Keyboard.control) {
                        //e.preventDefault();
                        select_pos_atclick = 0;
                        cursor_position = this.text.length;
                        select_start = 0;
                        select_end = this.text.length;
                        section_selected = true;
                    }
                    break;
                default:
                    break;
            }
            if (cursor_position < 0)
                cursor_position = 0;
            var arr = this.text.split('');
            if (cursor_position > arr.length)
                cursor_position = arr.length;
            if (cursor_position !== prev_cursor_pos) {
                this.scroll();
            }

        };
        var key_had_been_pressed_since_focus = false;
        this.onKeyPress = function (e) {
            if (this.hidden || !this.enabled)
                return null;

            L.i("input element onKeyPress: " + String.fromCharCode(e.which) + "[" + e.which + "]", "canvas_elements", 670);
            key_had_been_pressed_since_focus = true;
            if (e.keyCode === 13)
                return null;
            //delete selected input
            if (section_selected) {
                cursor_position = select_start;
                var fir_part = this.text.substring(0, select_start);
                var sec_part = this.text.substring(select_end, this.text.length);
                this.text = fir_part + sec_part;
                this.clearSelection();
            }

            var old = this.text + "";
            var input = String.fromCharCode(e.which);
            var arr = this.text.split('');
            arr.splice(cursor_position, 0, input);
            var newText = arr.join("");
            this.text = this.validate(newText, input);

            if (old.length < this.text.length)
                cursor_position++;
            if (cursor_position < 0)
                cursor_position = 0;
            if (cursor_position !== prev_cursor_pos) {
                this.scroll();
            }
            requestPaint();
        };
        this.onMouseUp = function (e) {
            if (this.hidden || !this.enabled)
                return null;
            if (section_selected && this.focused) {
                window.clearInterval(cursor_timer);
            }
            cursor_visible_override = false;
        };
        this.scroll = function () {
            var arr = this.text.split('');
            arr.splice(cursor_position, this.text.length - cursor_position);
            var measureTxt = arr.join("");
            ctx.font = this.font;
            var cX = this.x + 12 / 2 + ctx.measureText(measureTxt).width + offsetX;
            if (cX > this.x + this.w - 6 && prev_cursor_pos < cursor_position) {
                offsetX -= cX - (this.x + this.w - 6);
            } else if (offsetX < 0 && prev_cursor_pos > cursor_position && backspace) {
                offsetX += (this.x + this.w - 6) - cX;
                backspace = false;
            } else if (offsetX < 0 && prev_cursor_pos > cursor_position && !backspace && cX < this.x + 6) {
                offsetX += (this.x + 6) - cX;
            }
            if (offsetX > 0) {
                offsetX = 0;
            }
        };
        this.onDefocus = function () {
            this.text = this.validate(this.text, this.text.substr(this.text.length - 1, this.text.length));
            if (this.text !== focused_text && key_had_been_pressed_since_focus)
                this.onTextEnter();
            key_had_been_pressed_since_focus = false;
            justfocused = false;
            window.clearInterval(cursor_timer);
            offsetX = 0;
        };
        var focused_text = "";
        this.onFocus = function () {
            key_had_been_pressed_since_focus = false;
            focused_text = this.text + "";
            if (this.selectonfocus && this.text !== undefined && this.text !== "") {
                section_selected = true;
                select_start = 0;
                select_end = this.text.length;
                cursor_position = select_end;
                select_pos_atclick = 0;
                justfocused = true;
            }
        };
        this.validate = function (newText, newChar) {
            if (this.allowedcharacters !== "all") {
                if (this.allowedcharacters.indexOf(newChar) === -1)
                    return this.text;
            }
            if (this.allowedcharacters === AllowedChars.Numbers || this.allowedcharacters === AllowedChars.NumbersFraction) {
                if (this.allowedcharacters.indexOf(newChar) === -1 && newText !== "")
                    return this.text;

                var val = parseFloat(newText);
                if (val < this.minvalue || newText === "")
                    return this.minvalue.toString();
                if (val > this.maxvalue)
                    return this.maxvalue.toString();

                return newText;
            }
            return newText;
        };
    };
    CanvasElements.Button = function Button(o) {
        if (o === null || o === undefined)
            o = {};
        CanvasElements.Element(this, o);

        var default_text_color = "#000";
        var default_ripple_color = "#000";

        this.text = (typeof o.text == 'undefined') ? "BUTTON" : o.text;
        this.icon = o.icon;
        this.iconsize = (typeof o.iconsize == 'undefined') ? 18 : o.iconsize;
        this.color = (typeof o.color == 'undefined') ? "#FFF" : o.color;
        this.elevated = (typeof o.elevated == 'undefined') ? true : o.elevated;
        this.alpha = (typeof o.alpha == 'undefined') ? 1 : o.alpha;
        this.ripple = (typeof o.ripple == 'undefined') ? true : o.ripple;
        this.elevationresting = (typeof o.elevationresting == 'undefined') ? 1 : o.elevationresting;
        this.elevationelevated = (typeof o.elevationelevated == 'undefined') ? 2.5 : o.elevationelevated;
        this.shape = (typeof o.shape == 'undefined') ? ButtonShape.Rectangular : o.shape;
        this.backcolor = this.color;
        this.cursor = o.cursor;
        this.toggleable = o.toggleable === undefined ? false : o.toggleable;
        this.cursorclicked = o.cursorclicked;
        this.style = (typeof o.style == 'undefined') ? "light" : o.style;
        this.textcolor = (typeof o.style == 'undefined') ? ((typeof o.textcolor == 'undefined') ? default_text_color : o.textcolor) : (o.style === "light" ? "#000" : (o.style === "dark" ? "#FFF" : default_text_color));

        var ripplecolor = "#000";
        var mul_shadow = 0;
        var disabled_color = Colors.grey_500;
        var disabled_style = "dark";
        var next_ripple_stays = false;

        var ripples = [];
        this.state = "released";
        var extraBack = 0;

        this.paint = function (alpha) {
            if (this.hidden)
                return null;
            if (alpha === undefined)
                alpha = this.alpha;
			else {
				alpha = this.alpha * alpha;
			}
            ctx.save();
            //button body
            ctx.globalAlpha = 1 * alpha;
            ctx.fillStyle = this.enabled ? this.color : disabled_color;
            Util.shadow(ctx, this.elevated ? (this.elevationresting + (mul_shadow * (this.elevationelevated - this.elevationresting))) : 0, function () {
                if (this.shape === ButtonShape.Rectangular)
                    Util.roundRect(ctx, this.x, this.y, this.w, this.h, this.corner, true, false);
                if (this.shape === ButtonShape.Circular) {
                    ctx.beginPath();
                    ctx.arc(this.x + this.w / 2, this.y + this.h / 2, this.w > this.h ? (this.w / 2) : (this.h / 2), 0, 2 * Math.PI, false);
                    ctx.closePath();
                    ctx.fill();
                }

            }.bind(this), alpha);
            ctx.beginPath();
            if (this.shape === ButtonShape.Circular) {
                //ctx.arc(this.centerP().x, this.centerP().y, this.w > this.h ? this.w / 2 : this.h / 2, 0, 2 * Math.PI, false);
                ctx.rect(this.x, this.y, this.w, this.h);
            }
            else {
                ctx.rect(this.x, this.y, this.w, this.h);
            }
            ctx.clip();

            ctx.globalAlpha = 1 * alpha;

            //paint ripple
            var sty = this.enabled ? this.style : disabled_style;
            ripplecolor = sty === undefined ? (default_ripple_color) : (sty === "light" ? "#000" : (sty === "dark" ? "#FFF" : default_ripple_color));
            for (var i = 0; i < ripples.length; i++) {
                ripples[i].paint(alpha * (ripplecolor === "#000" ? 0.12 : 0.3));
            }

            //paint extra back
            /*ctx.globalAlpha = 0.12 * alpha * extraBack;
            ctx.fillStyle = ripplecolor;
            if (this.shape === ButtonShape.Circular) {
                ctx.beginPath();
                ctx.arc(this.centerP().x, this.centerP().y, this.w > this.h ? this.w / 2 : this.h / 2, 0, 2 * Math.PI, false);
                ctx.closePath();
                ctx.fill();
            }
            else {
                ctx.fillRect(this.x, this.y, this.w, this.h);
            }*/
            


            ctx.globalAlpha = 1 * alpha;

            //paint text
            if (this.icon === undefined) {
                ctx.font = ("12px " + CanvasElementManager.canvasfont);
                var c = this.enabled ? this.textcolor : (disabled_style === "dark" ? "rgba(255, 255, 255, 0.54)" : "rgba(0, 0, 0, 0.54");
                ctx.fillStyle = c;
                ctx.globalAlpha = 1 * alpha;
                var x = this.x + (this.w / 2) - (ctx.measureText(this.text).width / 2);
                var y = this.y + 4 + this.h / 2;
                ctx.fillText(this.text, x, y);
            }

            //paint icon if present
            if (this.icon !== undefined) {
                ctx.font = this.iconsize + "px Material Icons";
                var c = this.enabled ? this.textcolor : (disabled_style === "dark" ? "rgba(255, 255, 255, 0.54)" : "rgba(0, 0, 0, 0.54");
                ctx.fillStyle = c;
                x = this.x + (this.w / 2) - (this.iconsize / 2);
                y = this.y + this.h / 2 + (this.iconsize / 2);
                ctx.fillText(this.icon, x, y);
            }

            ctx.restore();
            ctx.globalAlpha = 1;
        };

        this.onMouseDown = function (e) {
            if (this.hidden || !this.enabled)
                return null;
            if (this.cursorclicked !== undefined) {
                $(canvas).css('cursor', this.cursorclicked).css('cursor', "-webkit-" + this.cursorclicked);
            }
            if (intersectsMouse(this.x, this.y, this.w, this.h) && Mouse.left_pressed && this.state === "released") {
                this.press();
            }
        };
        this.onMouseUp = function (e) {
            if (this.hidden || !this.enabled)
                return null;
            if (this.cursor !== undefined && this.cursorclicked !== undefined) {
                $(canvas).css('cursor', this.cursor).css('cursor', "-webkit-" + this.cursor);
            }
            if (this.state === "pressed" && e.button === 0) {
                this.release();
            }
        };
        var intersected = false;
        var intersected2 = false;
        this.onMouseMove = function (e) {
            if (this.hidden || !this.enabled)
                return null;

            if (intersectsMouse(this.x, this.y, this.w, this.h) && this.cursor !== undefined && !this.manager.ismenuactive) {
                $(canvas).css('cursor', this.cursor).css('cursor', "-webkit-" + this.cursor);
                intersected = true;
            } else if (this.cursor !== undefined && intersected) {
                $(canvas).css('cursor', 'auto');
                intersected = false;
            }

            if (intersectsMouse(this.x, this.y, this.w, this.h) && this.cursorclicked !== undefined && Mouse.left_pressed && !this.manager.ismenuactive) {
                $(canvas).css('cursor', this.cursorclicked).css('cursor', "-webkit-" + this.cursorclicked);
                intersected2 = true;
            } else if (this.cursorclicked !== undefined && intersected2) {
                $(canvas).css('cursor', 'auto');
                intersected2 = false;
            }

            if (intersectsMouse(this.x, this.y, this.w, this.h) && Mouse.left_pressed && this.state === "released") {
                //this.press();
            } else {
                if (this.state === "pressed" && !intersectsMouse(this.x, this.y, this.w, this.h)) {
                    this.release(true);
                }
            }
        };
        var current_ripple = 0;
        var timer_shadow;
        this.release = function (cancel) {
            this.state = "released";
            if (this.onClick !== undefined && !cancel) {
                this.onClick(this.additionalinfo);
            }
            if (ripples[current_ripple] !== undefined) {
				if (!next_ripple_stays)  {
					ripples[current_ripple].finish(function() {
						this.clearRipples();
					}.bind(this));
				} else {
					ripples[current_ripple].fastOut();
				}
				for (var i = 0; i < ripples.length; i++) {
					if (i !== current_ripple) ripples[i].finish();
				}
                
            }

            var curr_mul = mul_shadow + 0;
            var final_mul = 0;
            timer_shadow = Util.animate(timer_shadow, decelerateInterpolator, 600, function (frac) {
                mul_shadow = interpolate(frac, curr_mul, final_mul);
            });
        };
        this.press = function (center) {
            this.state = "pressed";
            if (this.onPress !== undefined) {
                this.onPress(this.additionalinfo);
            }
			if (ripples[current_ripple] !== undefined) {
                ripples[current_ripple].cancelCallback();
            }
            current_ripple = ripples.length;
            var self = this;
            if (ripplesSet)
                return null;
            if (this.ripple) {
                ripples.push(new Ripple(self, center ? this.centerP() : {x: mouse_x + 0, y: mouse_y + 0}));
            }
            timer_shadow = Util.animate(timer_shadow, decelerateInterpolator, 600, function (frac) {
                mul_shadow = frac;
            });
        };
        this.clearRipples = function () {
            ripples = [];
        };
        var ripplesSet = false;
        this.setRipples = function (r) {
            ripplesSet = true;
            ripples = r;
        };
        this.getRipples = function () {
            return ripples;
        };
        this.centerP = function () {
            var P = {};
            P.x = this.x + this.w / 2;
            P.y = this.y + this.h / 2;
            return P;
        };
        function Ripple(parent, startPoint) {
            var x = parent.x;
            var y = parent.y;
            var w = parent.w;
            var h = parent.h;
			this.state = "start";
			this.callback_cancelled = false;
            this.mul_alpha = 1;
            this.mul_radius = 0;
            this.startP = startPoint;
            this.maxRadius = 0;
            if (parent.shape === ButtonShape.Rectangular)
                this.maxRadius = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)) / 2;
            if (parent.shape === ButtonShape.Circular)
                this.maxRadius = w > h ? w / 2 : h / 2;

            this.setParent = function (pt) {
                var x = parent.x;
                var y = parent.y;
                var w = parent.w;
                var h = parent.h;
                this.mul_alpha = 1;
                this.mul_radius = 0;
                this.startP = {x: mouse_x + 0, y: mouse_y + 0};
                this.maxRadius = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)) / 2;
            };
            this.paint = function (a) {
                ctx.fillStyle = ripplecolor;
                ctx.globalAlpha = this.mul_alpha * a;
                ctx.beginPath();
                ctx.arc(
                        interpolate(this.mul_radius, this.startP.x, parent.centerP().x),
                        interpolate(this.mul_radius, this.startP.y, parent.centerP().y),
                        interpolate(this.mul_radius, 0, this.maxRadius), 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.closePath();
            };
            this.cancelCallback = function() {
				this.callback_cancelled = true;
			}
			this.finish = function (callback) {
				if (this.state !== "start") return;
				
				this.state = "finish";
                this.from = this.mul_radius + 0;
                this.to = 1;
                if (this.timer_radius !== -1) {
                    window.clearInterval(this.timer_radius);
                    this.timer_radius = Util.animate(this.timer_radius, decelerateInterpolator, 200, function (frac) {
                        this.mul_radius = interpolate(frac, this.from, 1);
                    }.bind(this));
					this.timer_alpha = Util.animate(this.timer_alpha, linearInterpolator, 300, function (frac) {
						this.mul_alpha = 1 - frac;
					}.bind(this), function() {
						if (callback !== undefined && !this.callback_cancelled) callback();
					}.bind(this), 100);
                } else {
					this.timer_alpha = Util.animate(this.timer_alpha, linearInterpolator, 100, function (frac) {
						this.mul_alpha = 1 - frac;
					}.bind(this));
                }
            };
			this.fastOut = function() {
				this.from = this.mul_radius + 0;
                this.to = 1;
				window.clearInterval(this.timer_radius);
				this.timer_radius = Util.animate(this.timer_radius, decelerateInterpolator, 200, function (frac) {
                    this.mul_radius = interpolate(frac, this.from, 1);
                }.bind(this));
			}
            this.timer_radius = Util.animate(this.timer_radius, decelerateInterpolator, 1000, function (frac) {
                this.mul_radius = frac;
            }.bind(this), function () {
                this.timer_radius = -1;
            }.bind(this));
        }
        this.onClick = o.onClick === undefined ? function () {
        } : o.onClick;
        this.onPress = o.onPress === undefined ? function () {
        } : o.onPress;
        this.adjustWidthToText = function (padding) {
            var default_padding = 10;
            padding = padding === undefined ? default_padding : padding;
            ctx.font = ("12px " + CanvasElementManager.canvasfont);
            var new_width = ctx.measureText(this.text).width + (2 * padding);
            this.w = new_width;
        }
        this.toggled = false;
        this.toggle = function () {
            this.toggled = !this.toggled;
			if (ripples.length === 0 && this.toggled) {
				if (this.ripple) {
					current_ripple = ripples.length;
					var self = this;
					ripples.push(new Ripple(self, center ? this.centerP() : {x: mouse_x + 0, y: mouse_y + 0}));
				}
			}
            next_ripple_stays = this.toggled;
        }
    };
    CanvasElements.ToggleButton = function ToggleButton(o) {
        if (o === null || o === undefined)
            o = {};
        CanvasElements.Element(this, o);

        var default_text_color = "#000";
        var default_ripple_color = "#000";

        this.toggleable = true;
        this.text = (typeof o.text == 'undefined') ? "BUTTON" : o.text;
        this.state = ButtonState.UnChecked;
        this.color = (typeof o.color == 'undefined') ? "#FFF" : o.color;
        this.elevated = (typeof o.elevated == 'undefined') ? true : o.elevated;
        this.shape = (typeof o.shape == 'undefined') ? ButtonShape.Rectangular : o.shape;
        this.backcolor = this.color;
        this.style = (typeof o.style == 'undefined') ? "dark" : o.style;
        this.textcolor = (typeof o.style == 'undefined') ? ((typeof o.textcolor == 'undefined') ? default_text_color : o.textcolor) : (o.style === "light" ? "#000" : (o.style === "dark" ? "#FFF" : default_text_color));

        var rippleopacity = 0.3;
        var ripplecolor = "#000";
        var mul = 0;
        var curr_mul = 0;
        var anim_timer;
        var anim_duration = 200;

        this.paint = function (alpha) {
            if (alpha === undefined)
                alpha = 1;
            //button body
            ctx.globalAlpha = 1 * alpha;
            ctx.fillStyle = this.color;
            ctx.shadowColor = 'rgba(0, 0, 0, 0)';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetY = 0;
            if (this.elevated) {
                ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                ctx.shadowBlur = 2 + (mul * 8);
                ctx.shadowOffsetY = (2 + (mul * 8)) / 6;
            }
            if (this.shape === ButtonShape.Rectangular)
                Util.roundRect(ctx, this.x, this.y, this.w, this.h, this.corner, true, false);
            if (this.shape === ButtonShape.Circular) {
                ctx.beginPath();
                ctx.arc(this.x + this.w / 2, this.y + this.h / 2, this.w > this.h ? (this.w / 2) : (this.h / 2), 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.closePath();
            }
            ctx.shadowColor = 'rgba(0, 0, 0, 0)';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetY = 0;

            //paint ripple
            ripplecolor = (typeof o.style == 'undefined') ? (default_ripple_color) : (o.style === "light" ? "#000" : (o.style === "dark" ? "#FFF" : default_ripple_color));
            ctx.fillStyle = ripplecolor;
            ctx.save();
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.w, this.h);
            ctx.clip();
            ctx.beginPath();
            ctx.globalAlpha = rippleopacity * alpha * mul;
            ctx.arc(this.x + this.w / 2, this.y + this.h / 2, this.w > this.h ? (this.w / 2) : (this.h / 2), 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
            ctx.globalAlpha = 1 * alpha;

            //paint text
            ctx.font = ("12px " + CanvasElementManager.canvasfont);
            ctx.fillStyle = this.textcolor;
            ctx.globalAlpha = 0.87 * alpha;
            var x = this.x + (this.w / 2) - (ctx.measureText(this.text).width / 2);
            var y = this.y + 12 / 2 + this.h / 2;
            ctx.fillText(this.text, x, y);
            ctx.globalAlpha = 1;
        };
        this.onMouseDown = function () {
            if (intersectsMouse(this.x, this.y, this.w, this.h)) {
                this.onPress(this.additionalinfo);
            }
        };
        this.onMouseUp = function () {
            if (intersectsMouse(this.x, this.y, this.w, this.h)) {
                this.toggle();
                this.onClick(this.additionalinfo);
            }
        };
        this.toggle = function () {
            currMouseX = mouse_x;
            currMouseY = mouse_y;
            finalX = this.x + (this.w / 2);
            finalY = this.y + (this.h / 2);
            finalR = Math.sqrt(Math.pow(this.w, 2) + Math.pow(this.h, 2)) / 2;

            var state = this.state + 0;
            if (state === ButtonState.UnChecked) {
                curr_mul = mul + 0;
                this.state = ButtonState.OnCheck;
                anim_timer = Util.animate(anim_timer, squareInterpolator, anim_duration, function (frac) {
                    mul = interpolate(frac, 0, 1);
                }.bind(this), function () {
                    this.state = ButtonState.Checked;
                }.bind(this));
            }
            if (state === ButtonState.Checked) {
                this.state = ButtonState.OnUnCheck;
                anim_timer = Util.animate(anim_timer, squareInterpolator, anim_duration, function (frac) {
                    mul = interpolate(frac, 1, 0);
                }.bind(this), function () {
                    this.state = ButtonState.UnChecked;
                }.bind(this));
            }
            if (state === ButtonState.OnCheck) {
                window.clearInterval(anim_timer);
                curr_mul = mul + 0;
                this.state = ButtonState.OnUnCheck;
                anim_timer = Util.animate(anim_timer, squareInterpolator, anim_duration, function (frac) {
                    mul = interpolate(frac, curr_mul, 0);
                }.bind(this), function () {
                    this.state = ButtonState.UnChecked;
                }.bind(this));
            }
            if (state === ButtonState.OnUnCheck) {
                window.clearInterval(anim_timer);
                curr_mul = mul + 0;
                this.state = ButtonState.OnCheck;
                anim_timer = Util.animate(anim_timer, squareInterpolator, anim_duration, function (frac) {
                    mul = interpolate(frac, curr_mul, 1);
                }.bind(this), function () {
                    this.state = ButtonState.Checked;
                }.bind(this));
            }
        };

        this.onClick = o.onClick === undefined ? function () {
        } : o.onClick;
        this.onPress = o.onPress === undefined ? function () {
        } : o.onPress;
    };
    CanvasElements.Panel = function Panel(o) {
        if (o === null || o === undefined)
            o = {};
        CanvasElements.Element(this, o);
        this.no_events = (typeof o.no_events == 'undefined') ? true : o.no_events;
        if (!this.no_events) {
            //initialize section
            document.addEventListener("keydown", function (evt) {
                if (!this.hidden && this.manager.enabled && this.focused) {
                    this.onKeyDown(evt);
                }
            }.bind(this), false);
            document.addEventListener("keypress", function (evt) {
                if (!this.hidden && this.manager.enabled && this.focused)
                    this.onKeyPress(evt);
            }.bind(this), false);
            document.addEventListener("keyup", function (evt) {
                if (!this.hidden && this.manager.enabled && this.focused)
                    this.onKeyUp(evt);
            }.bind(this), false);
            document.addEventListener('mousedown', function (evt) {
                if (!this.hidden && this.manager.enabled)
                    this.onMouseDown(evt);
            }.bind(this), false);
            document.addEventListener("mousemove", function (evt) {
                if (!this.hidden && this.manager.enabled)
                    this.onMouseMove(evt);
            }.bind(this), false);
            document.addEventListener('mouseup', function (evt) {
                if (!this.hidden && this.manager.enabled)
                    this.onMouseUp(evt);
            }.bind(this), false);
            document.addEventListener('wheel', function (evt) {
                if (!this.hidden)
                    this.onScroll(evt);
            }.bind(this), false);
        }
        this.alpha = (typeof o.alpha == 'undefined') ? 1 : o.alpha;
        this.padding_top = (typeof o.padding_top == 'undefined') ? 16 : o.padding_top;
        this.padding_right = (typeof o.padding_right == 'undefined') ? 16 : o.padding_right;
        this.padding_bottom = (typeof o.padding_bottom == 'undefined') ? 16 : o.padding_bottom;
        this.padding_left = (typeof o.padding_left == 'undefined') ? 16 : o.padding_left;
        this.type = (typeof o.type == 'undefined') ? PanelType.None : o.type;
        this.corner = (typeof o.corner == 'undefined') ? 3 : o.corner;
        this.animateelevation = (typeof o.animateelevation == 'undefined') ? false : o.animateelevation;
        this.strokecolor = (typeof o.strokecolor == 'undefined') ? "#000" : o.strokecolor;
        this.childrenposition = (typeof o.childrenposition == 'undefined') ? Position.Relative : o.childrenposition;
        this.stroke = o.stroke;
        this.shadowstrength = (typeof o.shadowstrength == 'undefined') ? 0.2 : o.shadowstrength;
        this.showfocus = (typeof o.showfocus == 'undefined') ? (this.type !== PanelType.Card) : o.showfocus;
        this.hidden = (typeof o.hidden == 'undefined') ? false : o.hidden;
        this.paintoverride = (typeof o.paintoverride == 'undefined') ? false : o.paintoverride;

        this.elements = [];
        //syntax: -1 if none is selected, 0->n index if selected
        this.focus_index = -1;
        var p_tooltip_time = 2000;
        var p_tooltip_timer;
        var p_tooltip_index = -1;
        var elevation_resting = 2;
        var elevation_elevated = 4;
        var prev_enabled_state = true;

        this.paint = function (a) {
            if (a === undefined)
                a = 1;
            if (this.hidden) {
                for (var i = 0; i < this.elements.length; i++) {
                    if (this.elements[i].constructor.name === "Spinner") {
                        this.elements.finish();
                    }
                }
            }
            if (this.hidden && !this.paintoverride)
                return null;


            this.y = Math.floor(this.y);
            this.x = Math.floor(this.x);
            //paint background
            ctx.save();
            ctx.globalAlpha = 1 * a * this.alpha;
            switch (this.type) {
                case PanelType.Card:
                    ctx.fillStyle = this.backcolor;
                    Util.shadow(ctx, this.elevation, function () {
                        Util.roundRect(ctx, this.x + 0.5, this.y + 0.5, this.w, this.h, this.corner, false, false);
                        if (this.backcolor !== undefined)
                            ctx.fill();
                    }.bind(this), a);

                    if ((this.showfocus && this.focused) || (this.stroke == undefined ? false : this.stroke)) {
                        ctx.globalAlpha = (this.showfocus && this.focused) ? 0.3 : 0.12;
                        ctx.strokeStyle = this.strokecolor;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }

                    ctx.beginPath();
                    ctx.rect(this.x + 0.5, this.y + 0.5, this.w, this.h);
                    ctx.clip();
                    break;
                case PanelType.Frame:
                    ctx.globalAlpha = ((this.showfocus && this.focused && this.enabled) ? 0.3 : 0.12) * a * this.alpha;
                    ctx.strokeStyle = this.strokecolor;
                    ctx.lineWidth = 1;
                    ctx.fillStyle = this.backcolor;
                    Util.roundRect(ctx, this.x + 0.5, this.y + 0.5, this.w, this.h, this.corner, true, false);
                    if (this.backcolor !== undefined)
                        ctx.fill();
                    if (this.strokecolor !== undefined)
                        ctx.stroke();
                    ctx.lineWidth = 1;
                    ctx.globalAlpha = 1;

                    ctx.beginPath();
                    ctx.rect(this.x, this.y, this.w, this.h);
                    ctx.clip();
                    break;
                case PanelType.None:
                    ctx.beginPath();
                    ctx.rect(this.x, this.y, this.w, this.h);
                    ctx.clip();
                    break;
            }
            ctx.globalAlpha = 1;

            //paint elements on it
            var paintImpl = function paintImpl(menu_switch, element) {
                if (prev_enabled_state !== this.enabled) {
                    if (!this.enabled)
                        element.enabled = false;
                    else
                        element.enabled = true;
                }
                if (this.childrenposition === Position.Relative) {
                    ctx.translate(this.x, this.y);
                }
                var m_t = this.padding_top + element.margin_top;
                var m_r = this.padding_right + element.margin_right;
                var m_b = this.padding_bottom + element.margin_bottom;
                var m_l = this.padding_left + element.margin_left;
                var menu_switch_condition = menu_switch ? element.isopenmenu : !element.isopenmenu;
                if (element.paint !== undefined && menu_switch_condition) {
                    for (var g = 0; g < 2; g++) {
                        var grav = g === 1 ? element.gravity : element.gravity2;
                        if (grav !== Gravity.None) {
                            switch (grav) {
                                case Gravity.Top:
                                    element.y = m_t;
                                    break;
                                case Gravity.TopLeft:
                                    element.y = m_t;
                                    element.x = m_l;
                                    break;
                                case Gravity.TopRight:
                                    element.y = m_t;
                                    element.x = this.w - (element.w + m_r);
                                    break;
                                case Gravity.Bottom:
                                    element.y = this.h - (element.h + m_b);
                                    break;
                                case Gravity.BottomLeft:
                                    element.y = this.h - (element.h + m_b);
                                    element.x = m_l;
                                    break;
                                case Gravity.Left:
                                    element.x = m_l;
                                    break;
                                case Gravity.Right:
                                    element.x = this.w - (element.w + m_r);
                                    break;
                                case Gravity.BottomRight:
                                    element.y = this.h - (element.h + m_b);
                                    element.x = this.w - (element.w + m_r);
                                    break;
                                case Gravity.Center:
                                    element.y = (this.h / 2) - (element.h / 2);
                                    element.x = (this.w / 2) - (element.w / 2);
                                    break;
                                case Gravity.CenterHorizontal:
                                    element.x = (this.w / 2) - (element.w / 2);
                                    break;
                                case Gravity.CenterVertical:
                                    element.y = (this.h / 2) - (element.h / 2);
                                    break;
                            }
                        }
                    }
                    if (element.below !== undefined) {
                        element.y = element.below.y + element.below.h + element.below_padding + m_t;
                    }
                    if (element.atop !== undefined) {
                        element.y = element.atop.y - element.atop.h - m_b;
                    }
                    if (element.torightof !== undefined) {
                        element.x = element.torightof.x + element.torightof.w + m_l;
                    }
                    if (element.toleftof !== undefined) {
                        element.x = element.toleftof.x - element.toleftof.w - m_r;
                    }
                    element.paint(a * this.alpha);
                    ctx.fillStyle = element.divider_color;
                    ctx.globalAlpha = a * this.alpha;
                    if (element.divider_top)
                        ctx.fillRect(0, element.y - element.padding_top, 9999, 1);
                    if (element.divider_bottom)
                        ctx.fillRect(0, element.y + element.w - 1 + element.padding_bottom, 9999, 1);
                    if (element.divider_left)
                        ctx.fillRect(element.x - element.padding_left, 0, 1, 9999);
                    if (element.divider_right)
                        ctx.fillRect(element.x + element.h + element.padding_right, 0, 1, 9999);
                    ctx.globalAlpha = 1;

                    if (CanvasElementManager.showlayoutbounds && !element.hidden) {
                        drawLayoutBounds(element);
                    }

                }
                if (this.childrenposition === Position.Relative) {
                    ctx.translate(-this.x, -this.y);
                }
            }.bind(this);
            for (var i = 0; i < this.elements.length; i++) {
                var el = this.elements[i];
                if (this.elements[i] instanceof CanvasElements.RadioGroup) {
                    for (var j = 0; j < this.elements[i].elements.length; j++) {
                        el = this.elements[i].elements[j];
                        paintImpl(false, el);
                    }
                }
                paintImpl(false, el);
            }
            ctx.restore();
            for (var i = 0; i < this.elements.length; i++) {
                var el = this.elements[i];
                if (this.elements[i] instanceof CanvasElements.RadioGroup) {
                    for (var j = 0; j < this.elements[i].elements.length; j++) {
                        el = this.elements[i].elements[j];
                        paintImpl(true, el);
                    }
                }
                paintImpl(true, el);
            }
            prev_enabled_state = this.enabled && true;
        };
        this.add = function (element) {
            element.manager = rootManager;
            element.parent = this;
            element.index = this.elements.length;
            this.elements.push(element);
            requestPaint();
        };
        this.remove = function (element) {
            var index = this.elements.indexOf(element);
            if (index > -1)
                this.elements.splice(index, 1);
            requestPaint();
        };
        var timer_elevation_anim;
        this.onFocus = function () {
            if (this.animateelevation) {
                var curr = this.elevation + 0;
                timer_elevation_anim = Util.animate(timer_elevation_anim, decelerateInterpolator, 600, function (frac) {
                    this.elevation = curr + (frac * (elevation_elevated - curr));
                }.bind(this));
            }
            for (var i = 0; i < this.elements.length; i++) {
                //if (this.elements[i].onFocus !== undefined)
                //this.elements[i].onFocus();
            }
        };
        this.onDefocus = function () {
            //this.focus_index = -1;
            if (this.animateelevation) {
                var curr = this.elevation + 0;
                timer_elevation_anim = Util.animate(timer_elevation_anim, decelerateInterpolator, 600, function (frac) {
                    this.elevation = curr - (frac * (curr - elevation_resting));
                }.bind(this));
            }
            this.focused = false;
            for (var i = 0; i < this.elements.length; i++) {
                this.elements[i].focused = false;
                if (this.elements[i].onDefocus !== undefined)
                    this.elements[i].onDefocus();
            }
            this.focus_index = -1;
            requestPaint();
        };
        this.focusElement = function (element) {
            if (element.focused)
                return null;
            element.focused = true;
            this.focus_index = element.index;
            this.paint_needed = true;
            if (element.onFocus !== undefined) {
                element.onFocus();
            }
        };
        this.defocusElement = function (element) {
            if (!element.focused)
                return null;
            element.focused = false;
            this.paint_needed = true;
            if (element.onDefocus !== undefined)
                element.onDefocus();
        };
        this.onKeyDown = function (e) {
            if (this.hidden || !this.enabled)
                return null;
            if (!(this.focused && this.manager.enabled && !this.hidden))
                return null;

            requestPaint();
            if (this.elements[this.focus_index] !== undefined && this.elements[this.focus_index].onKeyDown !== undefined) {
                this.elements[this.focus_index].onKeyDown(e);
            }
        };
        this.onKeyPress = function (e) {
            if (this.hidden || !this.enabled)
                return null;
            if (!(this.focused && this.manager.enabled && !this.hidden))
                return null;
            this.paint_needed = true;
            //alert("Kecske");
            if (this.elements[this.focus_index] !== undefined && this.elements[this.focus_index].onKeyPress !== undefined) {
                //alert("Kecskécske");
                this.elements[this.focus_index].onKeyPress(e);
            }
        };
        this.onKeyUp = function (e) {
            if (this.hidden || !this.enabled)
                return null;
            if (!(this.focused && this.manager.enabled && !this.hidden))
                return null;
            if (this.elements[this.focus_index] !== undefined && this.elements[this.focus_index].onKeyUp !== undefined) {
                this.elements[this.focus_index].onKeyUp(e);
            }
        };
        this.onMouseDown = function (e) {
            if (this.hidden || !this.enabled)
                return null;
            if (!(this.manager.enabled && !this.hidden))
                return null;
            rootManager.tooltip.hide();
            if (this.childrenposition === Position.Relative) {
                mouse_x -= this.x;
                mouse_y -= this.y;
            }
            var intersected = false;
            for (var i = 0; i < this.elements.length; i++) {
                if (intersectsMouse(this.elements[i].x, this.elements[i].y, this.elements[i].w, this.elements[i].h) && !this.elements[i].hidden
                        && (!this.manager.ismenuactive || this.elements[i].isopenmenu || this.elements[i] instanceof CanvasElements.Panel || (this.parent instanceof CanvasElements.Dialog && !this.isOpenMenu()))) {
                    if (!this.elements[i].focused)
                        this.focusElement(this.elements[i]);
                    intersected = true;
                    if (this.elements[i].onMouseDown !== undefined)
                        this.elements[i].onMouseDown(e);
                } else {
                    if (this.elements[i].focused && (!(this.elements[i] instanceof CanvasElements.Panel) || !rootManager.ismenuactive))
                        this.defocusElement(this.elements[i]);
                }
            }
            if (!intersected)
            {
                //this.focus_index = -1;

            }
            if (this.childrenposition === Position.Relative) {
                mouse_x += this.x;
                mouse_y += this.y;
            }
            this.paint_needed = true;
        };
        this.onMouseUp = function (e) {
            if (this.hidden || !this.enabled)
                return null;
            if (!(this.manager.enabled && !this.hidden))
                return null;
            rootManager.tooltip.hide();
            if (this.childrenposition === Position.Relative) {
                mouse_x -= this.x;
                mouse_y -= this.y;
            }
            for (var i = 0; i < this.elements.length; i++) {
                if (this.elements[i].onMouseUp !== undefined && intersectsMouse(this.elements[i].x, this.elements[i].y, this.elements[i].w, this.elements[i].h))
                    this.elements[i].onMouseUp(e);
            }
            if (this.childrenposition === Position.Relative) {
                mouse_x += this.x;
                mouse_y += this.y;
            }
        };
        this.onMouseMove = function (e) {
            if (this.hidden || !this.enabled)
                return null;
            if (!(this.manager.enabled && !this.hidden))
                return null;
            var intersected = false;
            if (this.childrenposition === Position.Relative) {
                mouse_x -= this.x;
                mouse_y -= this.y;
            }
            for (var i = 0; i < this.elements.length; i++) {
                if (intersectsMouse(this.elements[i].x, this.elements[i].y, this.elements[i].w, this.elements[i].h) && !mouse_clicked) {

                    intersected = true;
                    if (p_tooltip_index !== i) {
                        window.clearTimeout(p_tooltip_timer);
                        p_tooltip_index = i;
                        var text = this.elements[i].getTooltip();
                        window.setTimeout(function () {
                            rootManager.tooltip.new(text);
                        }, p_tooltip_time);
                    }
                }
                if (this.elements[i].onMouseMove !== undefined)
                    this.elements[i].onMouseMove(e);
            }
            if (!intersected) {
                window.clearTimeout(p_tooltip_timer);
                rootManager.tooltip.hide();
                p_tooltip_index = -1;
            }

            if (this.childrenposition === Position.Relative) {
                mouse_x += this.x;
                mouse_y += this.y;
            }
        };
        this.onScroll = function (e) {
            if (!(this.focused && this.manager.enabled && !this.hidden))
                return null;
            if (this.elements[this.focus_index] !== undefined && this.elements[this.focus_index].onScroll !== undefined) {
                this.elements[this.focus_index].onScroll(e);
            }
        };
        this.getTooltip = function () {
            if (this.childrenposition === Position.Relative) {
                mouse_x -= this.x;
                mouse_y -= this.y;
            }
            var text = "_none";
            for (var i = 0; i < this.elements.length; i++) {
                if (intersectsMouse(this.elements[i].x, this.elements[i].y, this.elements[i].w, this.elements[i].h)) {
                    text = this.elements[i].getTooltip();
                }
            }
            if (this.childrenposition === Position.Relative) {
                mouse_x += this.x;
                mouse_y += this.y;
            }
            return text;
        };
        this.isOpenMenu = function () {
            var openmenu = false;
            for (var i = 0; i < this.elements.length; i++) {
                openmenu = openmenu || this.elements[i].isopenmenu;
            }
            return openmenu;
        };
        this.isInputFocused = function () {
            var result = false;
            for (var j = 0; j < this.elements.length; j++) {
                if (this.elements[j].constructor.name === "Panel") {
                    result = result || this.elements[j].isInputFocused();
                } else if (this.elements[j].constructor.name === "Input") {
                    result = result || this.elements[j].focused;
                }
                if (result)
                    break;
            }
            return result;
        };
        this.finishSpinners = function () {
            for (var i = 0; i < this.elements.length; i++) {
                if (this.elements[i].constructor.name === "Spinner") {
                    this.elements[i].finish();
                }
            }
        };
    };
    CanvasElements.RadioGroup = function RadioGroup(o) {
        if (o === null || o === undefined)
            o = {};
        this.elements = [];
        //syntax: -1 if none is selected, 0->n index if selected
        this.focus_index = -1;
        this.x = 0;
        this.y = 0;
        this.w = 9999;
        this.h = 9999;

        this.paint = function () {
           
        };
        this.add = function (element) {
            if (element.toggleable) {
                element.isradio = true;
                this.elements.push(element);
                for (var i = 0; i < this.elements.length; i++) {

                }
                requestPaint();
            }
        };
        this.focusElement = function (element) {
            if (element.state === ButtonState.OnCheck || element.state === ButtonState.Checked)
                return null;
            element.focused = true;
            this.focus_index = element.index;
            if (element.toggle !== undefined) {
                element.toggle();
            }
            requestPaint();
        };
        this.defocusElement = function (element) {
            if (element.state === ButtonState.OnUnCheck || element.state === ButtonState.UnChecked)
                return null;
            element.focused = false;
            if (element.toggle !== undefined)
                element.toggle();
            requestPaint();
        };
        this.onKeyDown = function (e) {
            if (this.elements[this.focus_index] !== undefined && this.elements[this.focus_index].onKeyDown !== undefined) {
                this.elements[this.focus_index].onKeyDown(e);
            }
        };
        this.onKeyPress = function (e) {
            if (this.elements[this.focus_index] !== undefined && this.elements[this.focus_index].onKeyPress !== undefined) {
                this.elements[this.focus_index].onKeyPress(e);
            }
        };
        this.onKeyUp = function (e) {
            if (this.elements[this.focus_index] !== undefined && this.elements[this.focus_index].onKeyUp !== undefined) {
                this.elements[this.focus_index].onKeyUp(e);
            }
        };
        this.onMouseDown = function (e) {
            for (var i = 0; i < this.elements.length; i++) {
                if (this.elements[i].onMouseDown !== undefined)
                    this.elements[i].onMouseDown(e);
            }
        };
        this.onMouseUp = function (e) {
            for (var i = 0; i < this.elements.length; i++) {
                if (this.elements[i].onMouseUp !== undefined)
                    this.elements[i].onMouseUp(e);
            }

            var intersected = false;
            var index = -1;
            for (var i = 0; i < this.elements.length; i++) {
                if (intersectsMouse(this.elements[i].x, this.elements[i].y, this.elements[i].w, this.elements[i].h)) {
                    this.focusElement(this.elements[i]);
                    intersected = true;
                    index = i;
                }
            }
            if (intersected)
            {
                for (var i = 0; i < this.elements.length; i++) {
                    if (i !== index)
                        this.defocusElement(this.elements[i]);
                }
            }
            requestPaint();
        };
        this.onMouseMove = function (e) {
            for (var i = 0; i < this.elements.length; i++) {

                if (this.elements[i].onMouseMove !== undefined)
                    this.elements[i].onMouseMove(e);
            }
        };
        this.onScroll = function (e) {
            if (this.elements[this.focus_index] !== undefined && this.elements[this.focus_index].onScroll !== undefined) {
                this.elements[this.focus_index].onScroll(e);
            }
        };
        this.getTooltip = function () {
            var text = "_none";
            for (var i = 0; i < this.elements.length; i++) {
                if (intersectsMouse(this.elements[i].x, this.elements[i].y, this.elements[i].w, this.elements[i].h)) {
                    text = this.elements[i].getTooltip();
                }
            }
            return text;
        };
    };
    CanvasElements.Dropdown = function Dropdown(o) {
        if (o === null || o === undefined)
            o = {};
        CanvasElements.Element(this, o);

        this.items = o.items === undefined ? [] : o.items;
        this.selecteditem = o.selecteditem === undefined ? 0 : o.selecteditem;
        this.state = o.state === undefined ? DropdownState.Closed : o.state;
        this.elevatedclosed = o.elevatedclosed === undefined ? false : o.elevatedclosed;
        this.elevatedopened = o.elevatedopened === undefined ? true : o.elevatedopened;
        this.backcolorclosed = o.backcolorclosed === undefined ? this.backcolor : o.backcolorclosed;
        this.backcoloropened = o.backcoloropened === undefined ? this.backcolor : o.backcoloropened;
        this.textcolorclosed = o.textcolorclosed === undefined ? this.textcolor : o.textcolorclosed;
        this.textcoloropened = o.textcoloropened === undefined ? this.textcolor : o.textcoloropened;
        this.bordercolorclosed = o.bordercolorclosed === undefined ? "#000" : o.bordercolorclosed;
        this.bordercoloropened = o.bordercoloropened === undefined ? "#000" : o.bordercoloropened;
        this.itemheight = o.itemheight === undefined ? this.h + 0 : o.itemheight;
        this.itemiconsize = o.itemiconsize === undefined ? 18 : o.itemiconsize;
        this.corner = o.corner === undefined ? 3 : o.corner;
        this.shadowstrength = (typeof o.shadowstrength == 'undefined') ? 0.3 : o.shadowstrength;
        this.font = o.font === undefined ? ("12px " + CanvasElementManager.canvasfont) : o.font;
        this.selectedfont = o.selectedfont === undefined ? ("12px " + CanvasElementManager.canvasfont) : o.selectedfont;
        this.positivebutton = o.positivebutton;
        this.negativebutton = o.negativebutton;
        this.onItemSelected = o.onItemSelected === undefined ? (function () {
        }) : o.onItemSelected;

        var anim_duration = 200;
        var str = this.font.split(" ")[0].substring(0, this.font.split(" ")[0].length - 2);
        var font_size = parseFloat(str);
        var text_padding = 6;
        var dropdown_icon_padding = 1;
        var icon_size = 16;
        var text_y_offset = this.h / 2 + font_size / 2 - 2;
        var dropdown_icon = String.fromCharCode(58821);
        var opened_height;
        var hovered_index = 0;
        var org_h = this.h + 0;
        var curr_h;
        var anim_timer;
        var mul_shadow = 0;
        var curr_mul;

        this.paint = function (a) {
            if (a === undefined)
                a = 1;
            //draw back
            ctx.globalAlpha = 1 * a;
            ctx.shadowColor = "rgba(0, 0, 0, 0)";
            ctx.shadowBlur = 0;
            ctx.shadowOffsetY = 0;
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000";
            ctx.save();
            if (this.state === DropdownState.Closed) {
                var org = this.isopenmenu;
                this.isopenmenu = this.state !== DropdownState.Closed;
                rootManager.ismenuactive = this.isopenmenu;
                if (org !== this.isopenmenu)
                    requestPaint();

                ctx.fillStyle = this.enabled ? this.backcolorclosed : "rgba(0, 0, 0, 0.06)";
                Util.shadow(ctx, this.elevatedclosed ? 3 : 0, function () {
                    roundRect(Math.floor(this.x) + 0.5, Math.floor(this.y) + 0.5, this.w, this.h, this.corner, false, false);
                    //ctx.clip();
                    ctx.fill();
                }.bind(this), a);
                if (!this.elevatedclosed && !this.noborders) {
                    ctx.lineWidth = 1;
                    ctx.globalAlpha = 0.3 * a;
                    ctx.strokeStyle = this.enabled ? this.bordercolorclosed : "rgba(0, 0, 0, 1)";
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
                ctx.beginPath();
                ctx.rect(Math.floor(this.x) + 0.5, Math.floor(this.y) + 0.5, this.w, this.h);
                ctx.clip();
            } else {
                ctx.globalAlpha = mul_shadow * a;
                ctx.fillStyle = this.backcoloropened;
                Util.shadow(ctx, this.elevatedopened ? (3 * mul_shadow) : 0, function () {
                    roundRect(Math.floor(this.x) + 0.5, Math.floor(this.y) + 0.5, this.w, this.h, this.corner, false, false);
                    //ctx.clip();
                    ctx.fill();
                }.bind(this), a);

                ctx.globalAlpha = (1 - mul_shadow) * a;
                ctx.fillStyle = this.backcolorclosed;
                Util.shadow(ctx, this.elevatedclosed ? (3 * (1 - mul_shadow)) : 0, function () {
                    ctx.fillStyle = this.backcoloropened;
                    roundRect(Math.floor(this.x) + 0.5, Math.floor(this.y) + 0.5, this.w, this.h, this.corner, false, false);
                    //ctx.clip();
                    ctx.fill();
                }.bind(this), a);

                if (!this.elevatedopened && !this.noborders) {
                    ctx.globalAlpha = a * 0.3 * this.elevatedclosed ? 1 : mul_shadow;
                    ctx.strokeStyle = this.bordercolorclosed;
                    ctx.stroke();
                    if (!this.elevatedclosed) {
                        ctx.globalAlpha = a * 0.3 * this.elevatedclosed ? 0 : 1 - mul_shadow;
                        ctx.strokeStyle = this.bordercoloropened;
                        ctx.stroke();
                    }
                } else {
                    if (!this.elevatedclosed && !this.noborders) {
                        ctx.globalAlpha = 0.3 * (1 - mul_shadow) * a;
                        ctx.strokeStyle = this.bordercolorclosed;
                        ctx.stroke();
                        if (!this.elevatedopened) {
                            ctx.globalAlpha = a * 0.3 * mul_shadow;
                            ctx.strokeStyle = this.bordercoloropened;
                            ctx.stroke();
                        }
                    }
                }
                ctx.globalAlpha = 1;
                ctx.beginPath();
                ctx.rect(Math.floor(this.x) + 0.5, Math.floor(this.y) + 0.5, this.w, this.h);
                ctx.clip();
            }


            ctx.globalAlpha = 0.12 * a;
            ctx.fillStyle = "#000";
            if (this.state !== DropdownState.Closed) {
                ctx.fillRect(this.x, this.y + org_h - 1, this.w, 1);
            }

            //draw selected item
            var icon_padding = this.items[this.selecteditem].icon !== undefined ? (this.itemiconsize + text_padding) : 0;
            ctx.font = this.selectedfont;
            ctx.fillStyle = this.enabled ? this.textcoloropened : "rgba(0, 0, 0, 0.54)";
            ctx.globalAlpha = 0.87 * mul_shadow * a;
            ctx.fillText(this.items[this.selecteditem].text, this.x + text_padding + icon_padding, this.y + text_y_offset);
            ctx.fillStyle = this.enabled ? this.textcolorclosed : "rgba(0, 0, 0, 0.54)";
            ctx.globalAlpha = 0.87 * (1 - mul_shadow) * a;
            ctx.fillText(this.items[this.selecteditem].text, this.x + text_padding + icon_padding, this.y + text_y_offset);
            if (this.items[this.selecteditem].icon !== undefined) {
                ctx.font = this.itemiconsize + "px Material Icons";
                ctx.globalAlpha = 0.54 * mul_shadow * a;
                ctx.fillStyle = this.textcoloropened;
                ctx.fillText(this.items[this.selecteditem].icon, this.x + text_padding, this.y + (this.itemiconsize / 2) + (org_h * 0.5));
                ctx.globalAlpha = 0.54 * (1 - mul_shadow) * a;
                ctx.fillStyle = this.textcolorclosed;
                ctx.fillText(this.items[this.selecteditem].icon, this.x + text_padding, this.y + (this.itemiconsize / 2) + (org_h * 0.5));
            }

            //draw other items
            ctx.fillStyle = "#000";
            for (var i = 0; i < this.items.length; i++) {
                icon_padding = this.items[i].icon !== undefined ? (this.itemiconsize + text_padding) : 0;
                if (this.items[i].icon !== undefined) {
                    ctx.font = this.itemiconsize + "px Material Icons";
                    ctx.globalAlpha = 0.54 * a;
                    ctx.fillText(this.items[i].icon, this.x + text_padding, this.y + (this.itemiconsize / 2) + (org_h * 1.5) + (i * this.itemheight));
                }
                ctx.globalAlpha = 0.87 * a;
                ctx.font = this.font;
                if (hovered_index !== i) {
                    ctx.globalAlpha = 0.5 * a;
                    ctx.fillText(this.items[i].text, this.x + text_padding + icon_padding, this.y + text_y_offset + org_h + (i * this.itemheight));
                } else {
                    ctx.globalAlpha = 0.87 * a;
                    ctx.fillText(this.items[i].text, this.x + text_padding + icon_padding, this.y + text_y_offset + org_h + (i * this.itemheight));
                    ctx.fillStyle = "#000";
                    ctx.globalAlpha = 0.12 * a;
                    ctx.fillRect(this.x, this.y + org_h + (i * this.itemheight), this.w, this.itemheight);
                }
            }

            //draw dropdown icon
            var ic_x = this.x + (this.w - icon_size - dropdown_icon_padding);
            var ic_y = this.y + ((org_h / 2) - (icon_size / 2));
            var ic_cx = ic_x + (icon_size / 2);
            var ic_cy = ic_y + (icon_size / 2);
            ctx.translate(ic_cx, ic_cy);
            ctx.rotate(mul_shadow * Math.PI);
            ctx.globalAlpha = 0.54 * mul_shadow * a;
            ctx.fillStyle = this.textcoloropened;
            ctx.font = icon_size + "px Material Icons";
            ctx.fillText(dropdown_icon, -(icon_size / 2), +(icon_size / 2));
            ctx.globalAlpha = 0.54 * (1 - mul_shadow) * a;
            ctx.fillStyle = this.textcolorclosed;
            ctx.font = icon_size + "px Material Icons";
            ctx.fillText(dropdown_icon, -(icon_size / 2), +(icon_size / 2));
            ctx.translate(-ic_cx, -ic_cy);
            ctx.globalAlpha = 1;

            ctx.restore();
        };
        this.onMouseUp = function () {
            if (this.hidden || !this.enabled)
                return null;
            //recalculate opened width if items has changed
            opened_height = org_h + (this.items.length * this.itemheight);
            for (var i = 0; i < this.items.length; i++) {
                if (intersectsMouse(this.x, (this.y + org_h) + (i * this.itemheight), this.w, this.itemheight)) {
                    this.selecteditem = i;
                    this.onItemSelected(i);
                    requestPaint();
                    break;
                }
            }
            this.toggle();
        };
        this.onDefocus = function () {
            if (this.state === DropdownState.Opened || this.state === DropdownState.OnOpen) {
                this.toggle();
            }
        };
        this.onMouseMove = function () {
            if (this.hidden || !this.enabled)
                return null;

            var org_index = hovered_index + 0;
            for (var i = 0; i < this.items.length; i++) {
                if (intersectsMouse(this.x, (this.y + org_h) + (i * this.itemheight), this.w, this.itemheight)) {
                    hovered_index = i;

                    break;
                }
            }
            if (org_index !== hovered_index)
                requestPaint();
        };
        this.toggle = function () {
            var state = this.state + 0;
            if (state === DropdownState.Closed) {
                org_h = this.h + 0;
                this.state = DropdownState.OnOpen;
                anim_timer = Util.animate(anim_timer, decelerateInterpolator, anim_duration, function (frac) {
                    this.h = interpolate(frac, org_h, opened_height);
                    mul_shadow = interpolate(frac, 0, 1);
                }.bind(this), function () {
                    this.state = DropdownState.Opened;
                }.bind(this));
            }
            if (state === DropdownState.Opened) {
                this.state = DropdownState.OnClose;
                anim_timer = Util.animate(anim_timer, decelerateInterpolator, anim_duration, function (frac) {
                    this.h = interpolate(frac, opened_height, org_h);
                    mul_shadow = interpolate(frac, 1, 0);
                }.bind(this), function () {
                    this.state = DropdownState.Closed;
                    this.isopenmenu = false;
                    requestPaint();
                }.bind(this));
            }
            if (state === DropdownState.OnOpen) {
                window.clearInterval(anim_timer);
                curr_h = this.h + 0;
                curr_mul = mul_shadow + 0;
                this.state = DropdownState.OnClose;
                anim_timer = Util.animate(anim_timer, decelerateInterpolator, anim_duration, function (frac) {
                    this.h = interpolate(frac, curr_h, org_h);
                    mul_shadow = interpolate(frac, curr_mul, 0);
                }.bind(this), function () {
                    this.state = DropdownState.Closed;
                    this.isopenmenu = false;
                    requestPaint();
                }.bind(this));
            }
            if (state === DropdownState.OnClose) {
                window.clearInterval(anim_timer);
                curr_h = this.h + 0;
                curr_mul = mul_shadow + 0;
                this.state = DropdownState.OnOpen;
                anim_timer = Util.animate(anim_timer, decelerateInterpolator, anim_duration, function (frac) {
                    this.h = interpolate(frac, curr_h, opened_height);
                    mul_shadow = interpolate(frac, curr_mul, 1);
                }.bind(this), function () {
                    this.state = DropdownState.Opened;
                }.bind(this));
            }

            this.isopenmenu = this.state !== DropdownState.Closed;
            rootManager.ismenuactive = this.isopenmenu;

            if (this.state === DropdownState.OnOpen)
                hovered_index = this.selecteditem;
        };
        this.addItem = function (item) {
            item.index = this.items.length;
            this.items.push(item);
        };
        var indexCNT = 0;
        Dropdown.Item = function (o) {
            if (o === null || o === undefined)
                o = {};
            this.text = o.text === undefined ? "Item" : o.text;
            this.icon = o.icon;
            this.index = indexCNT++;
        };
    };
    CanvasElements.Checkbox = function Checkbox(o) {
        if (o === null || o === undefined)
            o = {};
        CanvasElements.Element(this, o);

        this.toggleable = true;
        this.toggleontext = o.selectedfont === undefined ? true : o.toggleontext;
        this.font = o.font === undefined ? ("12px " + CanvasElementManager.canvasfont) : o.font;
        this.text = o.text === undefined ? "Checkbox" : o.text;
        this.corner = o.corner === undefined ? 2 : o.corner;
        this.checkcolor = o.checkcolor === undefined ? CanvasElementManager.accentcolor : o.checkcolor;
        this.checked = o.checked === undefined ? false : o.checked;
        this.state = this.checked ? CheckboxState.Checked : CheckboxState.UnChecked;
        this.onStateChanged = o.onStateChanged === undefined ? function () {
        } : o.onStateChanged;

        var icon_check = String.fromCharCode(58826);
        var anim_duration = 200;
        var anim_timer;
        var mul = 0;
        var curr_mul;
        var box_size = 10;
        var icon_size = 8;
        var text_padding = 6;
        var text_y_offset = 4;

        this.paint = function (a) {
            roundRect(this.x + (-0.5 * (1 - mul)), this.y + (-0.5 * (1 - mul)) + (this.h / 2) - (box_size / 2), box_size, box_size, this.corner, false, false);
            if (this.state === CheckboxState.OnCheck || this.state === CheckboxState.OnUnCheck) {
                ctx.strokeStyle = "#000";
                ctx.fillStyle = this.enabled ? this.checkcolor : "rgba(0, 0, 0, 0.54)";
                ctx.globalAlpha = 1 * mul;
                ctx.fill();
                ctx.fillStyle = "#FFF";
                ctx.globalAlpha = 1 * mul * (this.enabled ? 1 : 0.54) * a;
                ctx.font = "8px Material Icons";
                if (!this.isradio)
                    ctx.fillText(icon_check, this.x + box_size / 2 - ctx.measureText(icon_check).width / 2, this.y + (this.h / 2) + (icon_size / 2));
                ctx.globalAlpha = 0.3 * (1 - mul);
                ctx.stroke();
            }
            if (this.state === CheckboxState.Checked) {
                ctx.fillStyle = this.enabled ? this.checkcolor : "rgba(0, 0, 0, 0.54)";
                ctx.globalAlpha = 1 * a;
                ctx.fill();
                ctx.fillStyle = "#FFF";
                ctx.globalAlpha = 1 * (this.enabled ? 1 : 0.54) * a;
                ctx.font = "8px Material Icons";
                if (!this.isradio)
                    ctx.fillText(icon_check, this.x + box_size / 2 - ctx.measureText(icon_check).width / 2, this.y + (this.h / 2) + (icon_size / 2));
            }
            if (this.state === CheckboxState.UnChecked) {
                ctx.strokeStyle = "#000";
                ctx.globalAlpha = 0.3 * a;
                ctx.stroke();
            }
            ctx.font = this.font;
            ctx.globalAlpha = 1 * a;
            ctx.fillStyle = this.enabled ? this.textcolor : "rgba(0, 0, 0, 0.54)";
            ctx.fillText(this.text, this.x + box_size + text_padding, this.y + this.h / 2 + text_y_offset);
        };
        this.onMouseUp = function () {
            if (intersectsMouse(this.x, this.y + this.h / 2 - box_size / 2, box_size, box_size) || this.toggleontext)
                this.toggle();
        };
        this.toggle = function () {

            var state = this.state + 0;
            if (state === CheckboxState.UnChecked) {
                curr_mul = mul + 0;
                this.checked = true;
                this.state = CheckboxState.OnCheck;
                anim_timer = Util.animate(anim_timer, decelerateInterpolator, anim_duration, function (frac) {
                    mul = interpolate(frac, 0, 1);
                }.bind(this), function () {
                    this.state = CheckboxState.Checked;
                }.bind(this));
            }
            if (state === CheckboxState.Checked) {
                this.checked = false;
                this.state = CheckboxState.OnUnCheck;
                anim_timer = Util.animate(anim_timer, decelerateInterpolator, anim_duration, function (frac) {
                    mul = interpolate(frac, 1, 0);
                }.bind(this), function () {
                    this.state = CheckboxState.UnChecked;
                }.bind(this));
            }
            if (state === CheckboxState.OnCheck) {
                window.clearInterval(anim_timer);
                curr_mul = mul + 0;
                this.checked = false;
                this.state = CheckboxState.OnUnCheck;
                anim_timer = Util.animate(anim_timer, decelerateInterpolator, anim_duration, function (frac) {
                    mul = interpolate(frac, curr_mul, 0);
                }.bind(this), function () {
                    this.state = CheckboxState.UnChecked;
                }.bind(this));
            }
            if (state === CheckboxState.OnUnCheck) {
                window.clearInterval(anim_timer);
                curr_mul = mul + 0;
                this.checked = true;
                this.state = CheckboxState.OnCheck;
                anim_timer = Util.animate(anim_timer, decelerateInterpolator, anim_duration, function (frac) {
                    mul = interpolate(frac, curr_mul, 1);
                }.bind(this), function () {
                    this.state = CheckboxState.Checked;
                }.bind(this));
            }

            this.onStateChanged(this.checked);
        };
    };
    CanvasElements.Dialog = function Dialog(o) {
        if (o === null || o === undefined)
            o = {};
        CanvasElements.Element(this, o);

        this.state = DialogState.Closed;
		this.ignore_first_key = o.ignore_first_key === undefined ? false : o.ignore_first_key;
        this.darkenstrength = o.darkenstrength === undefined ? 0.6 : o.darkenstrength;
        this.corner = o.corner === undefined ? 3 : o.corner;
        this.message = o.message === undefined ? "" : o.message;
        this.row_gap = o.row_gap === undefined ? 5 : o.row_gap;
        this.font = o.font === undefined ? ("12px " + CanvasElementManager.canvasfont) : o.font;
        this.icon = o.icon;
        this.panel = o.panel;
        this.builder_used = o.builder_used === undefined ? false : o.builder_used;
        this.cancelable = o.cancelable === undefined ? true : o.cancelable;
        this.negativebutton = o.negativebutton;
        this.positivebutton = o.positivebutton;
        this.negativeaction = o.negativeaction;
        this.positiveaction = o.positiveaction;
        if (this.negativebutton !== undefined) {
            this.negativebutton.onClick = function () {
                if (this.negativeaction !== undefined)
                    this.negativeaction(this.panel);

                this.hide();
            }.bind(this);
            this.negativebutton.adjustWidthToText();
        }
        if (this.positivebutton !== undefined) {
            this.positivebutton.onClick = function () {
                if (this.positiveaction !== undefined)
                    this.positiveaction(this.panel);

                this.hide();
            }.bind(this);
            this.positivebutton.adjustWidthToText();
        }

        var hidden = true;
        var anim_duration = 250;
        var anim_timer;
        var mul = 0;
        var curr_mul;
        var padding = 16;
        var font_size = parseFloat(this.font.split(" ")[0].substring(0, this.font.split(" ")[0].length - 2));
        var icon_size = 32;
        var offsetY = -(font_size / 2);
        var maxwidth = canvas.scaledWidth * 0.25;
        var minwidth = (2 * 90) + (3 * padding);
        if (maxwidth < minwidth)
            maxwidth = minwidth;

        var text_calculated = false;

        this.paint = function () {
            if (hidden) {
                return null;
            }
            if (this.state !== DialogState.Closed) {
                ctx.fillStyle = "#000";
                ctx.globalAlpha = this.darkenstrength * mul;
                ctx.fillRect(0, 0, canvas.scaledWidth, canvas.scaledHeight);

                ctx.fillStyle = this.backcolor;
                ctx.globalAlpha = 1 * mul;

                this.x = canvas.scaledWidth / 2 - this.w / 2;
                this.y = canvas.scaledHeight / 2 - this.h / 2;

                Util.shadow(ctx, mul * 5, function () {
                    roundRect(this.x, this.y, this.w, this.h, this.corner, true, false);
                }.bind(this), mul);

                ctx.globalAlpha = 1;
                //draw buttons
                if (this.negativebutton !== undefined) {
                    this.negativebutton.x = this.x + this.w - padding - this.positivebutton.w - this.negativebutton.w - (padding / 2);
                    this.negativebutton.y = this.y + this.h - padding - this.negativebutton.h;
                    this.negativebutton.paint(mul);
                }
                if (this.positivebutton !== undefined) {
                    this.positivebutton.x = this.x + this.w - padding - this.positivebutton.w;
                    this.positivebutton.y = this.y + this.h - padding - this.positivebutton.h;
                    this.positivebutton.paint(mul);
                }
                //draw message
                ctx.globalAlpha = 0.87 * mul;
                ctx.font = this.font;
                ctx.fillStyle = "#000";
                var finalMSG = this.message.split("\n");
                var offset = this.icon === undefined ? 0 : (padding) + icon_size;
                for (var i = 0; i < finalMSG.length; i++) {
                    ctx.fillText(finalMSG[i].trim(), this.x + padding + offset, this.y + padding + (font_size * (i + 1)) + +(this.row_gap * (i + 1)) + offsetY);
                }

                //draw panel
                if (this.panel !== undefined) {
                    this.panel.x = this.x;
                    this.panel.w = this.w;
                    var nh = 0;
                    var ph = 0;
                    if (this.negativebutton !== undefined)
                        nh = this.negativebutton.h;
                    if (this.positivebutton !== undefined)
                        ph = this.positivebutton.h;
                    this.panel.y = this.y + this.h - this.panel.h - (2 * padding) - (nh > ph ? nh : ph);
                    if (this.positivebutton === undefined && this.negativebutton === undefined)
                        this.panel.y = this.y;
                    this.panel.paint(mul);
                }

                if (this.icon !== undefined) {
                    //draw icon
                    ctx.fillStyle = "#000";
                    ctx.globalAlpha = 0.3 * mul;
                    ctx.font = icon_size + "px Material Icons";
                    ctx.fillText(this.icon, this.x + padding, this.y + padding + icon_size);
                }
            }
            ctx.globalAlpha = 1;
            ctx.shadowColor = "rgba(0, 0, 0, 0)";
            ctx.shadowBlur = 0;
            ctx.shadowOffsetY = 0;
            if (CanvasElementManager.showlayoutbounds && this.panel !== undefined) {
                drawLayoutBounds(this.panel);
            }
        };
        this.show = function () {
            if (this.state === DialogState.Closed) {
                if (this.panel !== undefined)
                    this.panel.hidden = false;
                hidden = false;
                //rootManager.ismenuactive = true;
                this.isopenmenu = true;
                //rootManager.focusElement(this);
                if (this.panel !== undefined)
                    this.panel.focused = true;
                this.toggle();
            }
        };
        this.hide = function (callback) {
            if (!this.cancelable)
                return null;
            if (hide_prevent) {
                hide_prevent = false;
                return null;
            }
            if (this.panel !== undefined) {
                if (this.panel.isOpenMenu())
                    return null;
            }
            if (this.state !== DialogState.Closed) {
                this.callB = callback;
                this.toggle(function () {
                    this.isopenmenu = false;
                    rootManager.ismenuactive = false;
                    rootManager.removeDialog();
                    rootManager.dialog = undefined;
                    if (this.panel !== undefined) {
                        this.panel.finishSpinners();
                        this.panel.hidden = true;
                    }
                    hidden = true;
                    if (this.callB !== undefined)
                        this.callB();
                }.bind(this));
            }
        };
        this.forceHide = function (callback) {
            var c = this.cancelable && this.cancelable;
            this.cancelable = true;
            this.hide(callback);
            this.cancelable = c;
        }
        this.onFocus = function () {
            if (this.panel !== undefined) {
                this.panel.focused = true;
                this.panel.onFocus();
            }
        };
        this.onDefocus = function () {
            if (this.panel !== undefined) {
                this.panel.focused = false;
                this.panel.onDefocus();
            }
            //this.hide();
        };
        var downInBox = false;
        this.toggle = function (onclose) {
            //if (rootManager.ismenuactive) return null;
            ctx.font = this.font;
            var full_msg_width = ctx.measureText(this.message).width;
            var w_limit = maxwidth - (2 * padding) - (this.icon !== undefined ? ((padding) + icon_size) : 0);
            var lines = full_msg_width / w_limit;
            if (!text_calculated) {
                if (lines > 1) {
                    var new_message = "";
                    text_calculated = true;
                    var curr_index = 0;
                    for (var i = 0; i < this.message.length; i++) {
                        var sub_str = this.message.substring(curr_index, i);
                        ctx.font = this.font;
                        var w = ctx.measureText(sub_str).width;
                        if (w >= w_limit) {
                            i = this.message.lastIndexOf(" ", i - 1);
                            new_message += this.message.substring(curr_index, i) + "\n";
                            curr_index = i;
                        }
                    }
                    new_message += this.message.substring(curr_index, this.message.length);
                    this.message = new_message;
                    this.w = maxwidth;
                    var nh = 0;
                    var ph = 0;
                    if (this.negativebutton !== undefined)
                        nh = this.negativebutton.h;
                    if (this.positivebutton !== undefined)
                        ph = this.positivebutton.h;
                    this.h = font_size * Math.ceil(lines) + this.row_gap * Math.ceil(lines) + 3 * padding + (nh > ph ? nh : ph);
                } else {
                    this.w = full_msg_width + 2 * padding;
                    if (this.w < minwidth)
                        this.w = minwidth;
                    var nh = 0;
                    var ph = 0;
                    if (this.negativebutton !== undefined)
                        nh = this.negativebutton.h;
                    if (this.positivebutton !== undefined)
                        ph = this.positivebutton.h;
                    this.h = font_size + ((3 - (nh + ph === 0 ? 1 : 0)) * padding) + (nh > ph ? nh : ph);
                    if (this.positivebutton === undefined && this.negativebutton === undefined
                            && (this.message === undefined || this.message === "")
                            && this.panel !== undefined)
                        this.h = 0;
                }
                if (this.panel !== undefined) {
                    this.h += this.panel.h;
                    this.w = this.panel.w;
                    if (this.w < 20)
                        this.w = 20;
                }
            }

            var state = this.state + 0;
            if (state === DialogState.Closed) {
                this.state = DialogState.OnOpen;
                anim_timer = Util.animate(anim_timer, decelerateInterpolator, anim_duration, function (frac) {
                    mul = interpolate(frac, 0, 1);
                }.bind(this), function () {
                    this.state = DialogState.Opened;
                }.bind(this));
            }
            if (state === DialogState.Opened) {
                this.state = DialogState.OnClose;
                anim_timer = Util.animate(anim_timer, decelerateInterpolator, anim_duration, function (frac) {
                    mul = interpolate(frac, 1, 0);
                }.bind(this), function () {
                    if (onclose !== undefined)
                        onclose();
                    this.state = DialogState.Closed;
                }.bind(this));
            }
            if (state === DialogState.OnOpen) {
                window.clearInterval(anim_timer);
                curr_mul = mul + 0;
                this.state = DialogState.OnClose;
                anim_timer = Util.animate(anim_timer, decelerateInterpolator, anim_duration, function (frac) {
                    mul = interpolate(frac, curr_mul, 0);
                }.bind(this), function () {
                    if (onclose !== undefined)
                        onclose();
                    this.state = DialogState.Closed;
                }.bind(this));
            }
            if (state === DialogState.OnClose) {
                window.clearInterval(anim_timer);
                curr_mul = mul + 0;
                this.state = DialogState.OnOpen;
                anim_timer = Util.animate(anim_timer, decelerateInterpolator, anim_duration, function (frac) {
                    mul = interpolate(frac, curr_mul, 1);
                }.bind(this), function () {
                    this.state = DialogState.Opened;
                }.bind(this));
            }
        };
        this.onMouseDown = function (e) {
            if (hidden)
                return null;
            if (this.panel !== undefined) {
                this.isopenmenu = this.isopenmenu || this.panel.isOpenMenu();
                //if (this.panel.isOpenMenu())
                    //return null;
                this.panel.onMouseDown(e);
            }
            if (isset(this.positivebutton)) {
                if (intersectsMouse(this.positivebutton.x, this.positivebutton.y, this.positivebutton.w, this.positivebutton.h)) {
                    if (this.positivebutton !== undefined)
                        this.positivebutton.onMouseDown(e);
                }
            }
            if (isset(this.negativebutton)) {
                if (intersectsMouse(this.negativebutton.x, this.negativebutton.y, this.negativebutton.w, this.negativebutton.h)) {
                    if (this.negativebutton !== undefined)
                        this.negativebutton.onMouseDown(e);
                }
            }

            if (intersectsMouse(this.x, this.y, this.w, this.h))
                downInBox = true;
            else
                downInBox = false;
        };
        this.onMouseUp = function (e) {
            if (hidden)
                return null;
            if (this.panel !== undefined) {
                this.isopenmenu = this.isopenmenu || this.panel.isOpenMenu();
                if (this.panel.isOpenMenu())
                    return null;
                //this.panel.onMouseUp(e);
            }
            if (isset(this.positivebutton)) {
                if (intersectsMouse(this.positivebutton.x, this.positivebutton.y, this.positivebutton.w, this.positivebutton.h)) {
                    if (this.positivebutton !== undefined)
                        this.positivebutton.onMouseUp(e);
                }
            }
            if (isset(this.negativebutton)) {
                if (intersectsMouse(this.negativebutton.x, this.negativebutton.y, this.negativebutton.w, this.negativebutton.h)) {
                    if (this.negativebutton !== undefined)
                        this.negativebutton.onMouseUp(e);
                }
            }
        };
        this.onMouseMove = function (e) {
            if (hidden)
                return null;
            if (this.panel !== undefined) {
                this.isopenmenu = this.isopenmenu || this.panel.isOpenMenu();
                if (this.panel.isOpenMenu())
                    return null;
            }

            if (this.positivebutton !== undefined)
                this.positivebutton.onMouseMove(e);
            if (this.negativebutton !== undefined)
                this.negativebutton.onMouseMove(e);
        };
        this.onKeyDown = function (e) {
			if (this.ignore_first_key) {
				this.ignore_first_key = false;
				return;
			}
            //enter
            if (e.keyCode === 13) {
                if (this.positivebutton !== undefined)
                    if (this.positivebutton.state !== "pressed")
                        this.positivebutton.press(true);
            }
            //escape
            if (e.keyCode === 27) {

                if (this.negativebutton !== undefined)
                    if (this.negativebutton.state !== "pressed")
                        this.negativebutton.press(true);
            }
        };
        this.onKeyUp = function (e) {
			if (this.ignore_first_key) {
				this.ignore_first_key = false;
				return;
			}
            //enter
            if (e.keyCode === 13) {
                if (this.positivebutton !== undefined)
                    this.positivebutton.release();
            }
            //escape
            if (e.keyCode === 27) {
                if (this.negativebutton !== undefined)
                    this.negativebutton.release();
            }
        };
        var hide_prevent = false;
        this.preventHide = function () {
            hide_prevent = true;
        };
        document.addEventListener("mouseup", function () {
            if (!intersectsMouse(this.x, this.y, this.w, this.h) && !downInBox) {
                this.hide();
            }
            downInBox = false;
        }.bind(this));
        if (this.panel !== undefined) {
            this.panel.parent = this;
        }
    };
    CanvasElements.Dialog.Builder = function DialogBuilder(manager) {
        this.settings = {};
        this.settings.builder_used = true;
        this.setPanel = function (panel) {
            panel.manager = {enabled: true};
            panel.focused = true;
            this.settings.panel = panel;
            return this;
        };
        this.setPositiveButton = function (text) {
            this.settings.positivebutton = new CanvasElements.Button({
                x: 0,
                y: 0,
                w: 70,
                h: 24,
                elevated: false,
                text: text,
                color: 'rgba(0, 0, 0, 0.00)'
            });
            return this;
        };
        this.setNegativeButton = function (text) {
            this.settings.negativebutton = new CanvasElements.Button({
                x: 0,
                y: 0,
                w: 70,
                h: 24,
                elevated: false,
                text: text,
                color: 'rgba(0, 0, 0, 0.00)'
            });
            return this;
        };
        this.setPositiveAction = function (action) {
            this.settings.positiveaction = action;
            return this;
        };
        this.setNegativeAction = function (action) {
            this.settings.negativeaction = action;
            return this;
        };
        this.setCancelable = function (cancelable) {
            this.settings.cancelable = cancelable;
            return this;
        };
        this.setMessage = function (text) {
            this.settings.message = text;
            return this;
        };
        this.setTitle = function (text) {
            //TODO implement this
            return this;
        };
        this.setIcon = function (icon) {
            this.settings.icon = icon;
            return this;
        };
        this.ignoreFirstEvent = function() {
			this.settings.ignore_first_key = true;
			return this;
		}
		this.show = function () {
            var dialog_exists = false;
            for (var i = 0; i < CanvasElementManagerCount; i++) {
                var mgr = CanvasElementManagerReferences[i];
                if (mgr.enabled)
                    rootManager = mgr;
            }
            if (rootManager === undefined)
                rootManager = {};
            var MGR = manager === undefined ? rootManager : manager;
            if (manager === undefined)
                manager = {};
            L.i("rootManager ID: " + rootManager.ID + " param manager ID: " + manager.ID, "canvas_elements", 2393);
            for (var elem = 0; elem < MGR.elements.length; elem++) {
                if (MGR.elements[elem].constructor.name === "Dialog") {
                    MGR.elements[elem].forceHide(function () { buildDialog(MGR); });
                    dialog_exists = true;
                    break;
                }
            }
            if (!dialog_exists)
                buildDialog(MGR);
        };
        var buildDialog = function(MGR) {
            if (this.settings.panel !== undefined)
                this.settings.panel.manager = MGR;
            var dialog = new CanvasElements.Dialog(this.settings);
            MGR.add(dialog);
            MGR.defocusAll();
            MGR.focusElement(dialog);
            if (dialog.panel !== undefined)
                dialog.panel.focused = true;
            dialog.show();
        }.bind(this);
    };
    CanvasElements.Label = function Label(o) {
        if (o === null || o === undefined)
            o = {};
        CanvasElements.Element(this, o);

        this.text = o.text === undefined ? "Label" : o.text;
		this.line_break = o.line_break === undefined ? true : o.line_break;
        this.font = o.font === undefined ? ("12px " + CanvasElementManager.canvasfont) : o.font;
        this.padding = o.padding === undefined ? 10 : o.padding;
        this.alpha = o.alpha === undefined ? 1 : o.alpha;
        this.row_gap = o.row_gap === undefined ? 5 : o.row_gap;

        var str = this.font.split(" ")[0].substring(0, this.font.split(" ")[0].length - 2);
        var font_size = parseFloat(str);
        var offsetY = -(font_size / 2);
        var actual_text = "";
        var old_w = this.w + 0;
		var old_text = this.text + "";

        this.paint = function (a) {
            ctx.save();
            ctx.rect(this.x, this.y, this.w, this.h);
            //ctx.clip();
            if (old_w !== this.w || old_text !== this.text)
                this.calculateText();
            //draw text
            ctx.globalAlpha = this.alpha * a;
            ctx.fillStyle = this.enabled ? this.textcolor : "rgba(0, 0, 0, 0.54)";
            ctx.font = NO_CACHE ? (this.font.substring(0, this.font.indexOf("px") + 3) + CanvasElementManager.canvasfont) : this.font;
            var finalMSG = actual_text.split("\n");
            for (var i = 0; i < finalMSG.length; i++) {
                ctx.fillText(finalMSG[i].trim(), this.x + this.padding, this.y + this.padding + (font_size * (i + 1)) + (this.row_gap * (i + 1)) + offsetY);
            }
            ctx.restore();
            ctx.globalAlpha = 1;
            old_w = this.w;
			old_text = this.text + "";
        };
        this.calculateText = function () {
			if (this.line_break) {
            ctx.font = this.font;
            //TODO optimize, optimalize this algorythm
            var full_txt_width = ctx.measureText(this.text).width;
            var w_limit = this.w - (2 * this.padding);
            var lines = full_txt_width / w_limit;
            var words = 0;
			if (lines > 1) {
                lines = 0;
                var new_message = "";
                var curr_index = 0;
                for (var i = 0; i < this.text.length; i++) {
                    i = this.text.indexOf(" ", i);
                    words++;
                    if (i < 0)
                        break;
                    var sub_str = this.text.substring(curr_index, i);
                    ctx.font = this.font;
                    var w = ctx.measureText(sub_str).width;
                    if (w >= w_limit) {
                        if (words > 1 || this.text.indexOf(" ", i) === -1)
                            i = this.text.lastIndexOf(" ", i - 1);
                        new_message += this.text.substring(curr_index, i) + "\n";
                        curr_index = i;
                        words = 0;
                        lines++;
                    }
                }
                lines++;
                L.i("label calculated lines: " + lines, "canvas_elements", 2352);
                this.h = (this.padding * 2) + (font_size * (lines)) + (this.row_gap * (lines - 1));
                new_message += this.text.substring(curr_index, this.text.length);
                actual_text = new_message;
            } else
                actual_text = this.text;
			}
			else {
				actual_text = this.text;
			}
        };
        this.calculateText();

        this.adjustWidthToText = function (padding) {
            var padd = this.padding * 2;
            ctx.font = ("12px " + CanvasElementManager.canvasfont);
            var new_width = ctx.measureText(this.text).width + padd;
            this.w = new_width;
        }
    };
    CanvasElements.TagContainer = function TagContainer(o) {
        if (o === null || o === undefined)
            o = {};
        CanvasElements.Element(this, o);

        this.text = o.text === undefined ? "Label" : o.text;
        this.font = o.font === undefined ? ("12px " + CanvasElementManager.canvasfont) : o.font;
        this.padding = o.padding === undefined ? 5 : o.padding;
        this.textpadding = o.textpadding === undefined ? 10 : o.textpadding;
        this.alpha = o.alpha === undefined ? 1 : o.alpha;
        this.items = o.items === undefined ? [] : o.items;
        this.itemheight = o.itemheight === undefined ? 20 : o.itemheight;
        this.onRemoveItem = o.onRemoveItem === undefined ? function () {
        } : o.onRemoveItem;
        this.onAddItem = o.onAddItem === undefined ? function () {
        } : o.onAddItem;

        var str = this.font.split(" ")[0].substring(0, this.font.split(" ")[0].length - 2);
        var font_size = parseFloat(str);
        var xButtonSize = 20;

        this.paint = function (a) {
            ctx.font = this.font;
            var x = this.x;
            var y = this.y;
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                var w = ctx.measureText(item.text).width + (1 * this.textpadding) + xButtonSize + (item.removable ? ((this.itemheight - xButtonSize) / 2) : 0);
                w *= item.alpha;
                ctx.fillStyle = item.backcolor;
                ctx.globalAlpha = item.alpha;
                roundRect(x, y, w, this.itemheight, this.itemheight / 2, true, false);
                if (item.removable) {
                    item.button.x = x + w - ((this.itemheight - xButtonSize) / 2) - xButtonSize;
                    item.button.y = y + ((this.itemheight - xButtonSize) / 2);
                    item.button.paint(Math.pow(item.alpha, 2));
                }
                ctx.globalAlpha = item.alpha;
                ctx.fillStyle = item.textcolor;
                ctx.fillText(item.text, x + this.textpadding, y + font_size / 4 + this.itemheight / 2);
                var nextW = 0;
                if (i < this.items.length - 1)
                    nextW = ctx.measureText(this.items[i + 1].text).width + (1 * this.textpadding) + xButtonSize + (this.items[i + 1].removable ? ((this.itemheight - xButtonSize) / 2) : 0);
                if (x + (this.padding * item.alpha) + w + nextW >= this.w) {
                    x = this.x;
                    y += this.itemheight + this.padding;
                } else {
                    x += w + (this.padding * item.alpha);
                }
            }
            ctx.globalAlpha = 1;
        };
        this.onMouseDown = function (e) {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].button !== undefined)
                    this.items[i].button.onMouseDown(e);
            }
        };
        this.onMouseMove = function (e) {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].button !== undefined)
                    this.items[i].button.onMouseMove(e);
            }
        };
        this.onMouseUp = function (e) {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].button !== undefined)
                    this.items[i].button.onMouseUp(e);
            }
        };
        this.removeItem = function (index) {
            this.onRemoveItem(index);
            var animating = this.items[index];
            Util.animate(null, Util.decelerateInterpolator, 400, function (frac) {
                animating.alpha = 1 - frac;
            }.bind(this), function () {
                this.items.splice(index, 1);
                for (var i = 0; i < this.items.length; i++) {
                    this.items[i].index = i;
                    indexCNT = i;
                }
                requestPaint();
            }.bind(this));
        };
        this.addItem = function (o, no_anim) {
            this.onAddItem(o);
            this.items.push(new TagContainer.Item(o));
            var animating = this.items[this.items.length - 1];
            animating.alpha = 0;
            requestPaint();
            Util.animate(null, Util.decelerateInterpolator, no_anim ? 1 : 400, function (frac) {
                animating.alpha = frac;
                requestPaint();
            }.bind(this), function () {
                requestPaint();
            }.bind(this));
        };
        var indexCNT = 0;

        var container = this;
        var TagContainer = {};
        TagContainer.Item = function (o) {
            if (o === null || o === undefined)
                o = {};

            //var c_arr = ["red", "green", "blue", "indigo", "purple", "pink", "cyan", "teal", "orange", "bluegrey"];
            var c_arr = ["blue", "light_blue", "bluegrey", "grey"];
            var index = Math.floor(Math.random() * c_arr.length);
            var shade = 3 + Math.floor(Math.random() * 4);
            var color_name = c_arr[index] + "_" + shade + "00";
            var c = Colors[color_name];
            var style = (shade < 4 && (c_arr[index] === "grey")) ? "light" : "dark";
            var txtColor = style === "light" ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 1)";


            this.text = o.text === undefined ? "Tag" : o.text;
            this.backcolor = o.backcolor === undefined ? c : o.backcolor;
            this.textcolor = o.textcolor === undefined ? txtColor : o.textcolor;
            this.removable = o.removable === undefined ? true : o.removable;
            this.icon = o.icon;
            this.index = indexCNT++;
            this.alpha = 1;
            if (this.removable) {
                this.button = new CanvasElements.Button({
                    font: "12px Arial",
                    text: "x",
                    style: style,
                    w: xButtonSize,
                    h: xButtonSize,
                    shape: ButtonShape.Circular,
                    elevated: false,
                    color: o.color === undefined ? "rgba(0, 0, 0, 0)" : o.color,
                    textcolor: o.textcolor === undefined ? "rgba(255, 255, 255, 0.87)" : o.textcolor,
                    onClick: function () {
                        container.removeItem(this.index);
                    }.bind(this)
                });
            }
        };
        for (var i = 0; i < this.items.length; i++) {
            var o = this.items[i];
            this.items[i] = new TagContainer.Item(o);
        }

    };
    CanvasElements.Image = function Image(o) {
        if (o === null || o === undefined)
            o = {};
        CanvasElements.Element(this, o);

        this.alpha = o.alpha === undefined ? 1 : o.alpha;
        this.backcolor = o.backcolor === undefined ? "#000" : o.backcolor;
        this.image = o.image;
        this.icon = o.icon;

        this.paint = function () {
            var font_size = (this.w >= this.h ? this.h : this.w);
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.backcolor;
            if (this.image !== undefined) {
                //TODO implement image drawing
            }
            if (this.icon !== undefined) {
                ctx.font = font_size + "px Material Icons";
                ctx.fillText(this.icon, this.x, this.y + font_size);
            }
            if ((this.icon === undefined && this.image === undefined) || NO_CACHE) {
                ctx.globalAlpha = 0.12;
                ctx.fillStyle = "#000";
                ctx.fillRect(this.x, this.y, this.w, this.h);
            }
            ctx.globalAlpha = 1;
        };
    };
    CanvasElements.Divider = function Divider(o) {
        if (o === null || o === undefined)
            o = {};
        CanvasElements.Element(this, o);

        this.alpha = o.alpha === undefined ? 0.12 : o.alpha;
        this.type = o.type === undefined ? DividerType.Horizontal : o.type;
        this.backcolor = o.backcolor === undefined ? Colors.black : o.backcolor;

        this.paint = function () {
            var font_size = (this.w >= this.h ? this.h : this.w);
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.backcolor;

            if (this.type === DividerType.Horizontal) {
                this.x = 0;
                this.w = 9999;
                this.h = 1;
                ctx.fillRect(this.x, this.y - 1, this.w, this.h);
            }
            if (this.type === DividerType.Vertical) {
                this.y = 0;
                this.w = 1;
                this.h = 9999;
                ctx.fillRect(this.x - 1, this.y, this.w, this.h);
            }
            ctx.globalAlpha = 1;
        };
    };
    CanvasElements.Spinner = function Spinner(o) {
        if (o === null || o === undefined)
            o = {};
        CanvasElements.Element(this, o);

        this.colors = o.colors === undefined ? [
            Colors.red_500,
            Colors.indigo_500,
            Colors.green_500,
            Colors.orange_500,
            Colors.blue_500
        ] : o.colors;
        this.ctx = o.ctx === undefined ? ctx : o.ctx;
        var no_paint_req = o.ctx !== undefined;


        var timerStart, timerEnd, timerAlpha, timerRot, timerColorfade;
        var start = 1, end = 0, rot = 0;
        var state = "resting";
        var current_color = this.colors[0];
        var next_color = this.colors[1];
        var color_mul = 0;
        var alpha = 1;
        var cycles = 0;
        var curr_color_index = 0;
        //settings
        var cycle = 1300;
        var offset = 300;
        var color_fade_duration = 200;
        var cycle_count = 5;
        var angular_rotation = 3 * 360;
        var offset_degrees = 8;
        var r = this.w > this.h ? this.h / 2 : this.w / 2;
        var tickness = r * 2 * (5 / 33);


        this.paint = function (a) {
            if (a === undefined)
                a = 1;
            var r = this.w > this.h ? this.h / 2 : this.w / 2;
            var c = {x: this.x + this.w / 2, y: this.y + this.h / 2};
            //ctx.save();
            this.ctx.beginPath();
            //ctx.moveTo(c.x, c.y);
            var from = interpolate(end, -offset_degrees, 360 - offset_degrees) - 90 + rot;
            var to = interpolate(start, offset_degrees, 360 + offset_degrees) - 90 + rot;
            this.ctx.arc(c.x, c.y, r, from / 180 * Math.PI, to / 180 * Math.PI, false);
            this.ctx.lineWidth = tickness;
            this.ctx.globalAlpha = alpha * a * (1 - color_mul);
            this.ctx.strokeStyle = current_color;
            this.ctx.stroke();
            this.ctx.globalAlpha = alpha * a * (color_mul);
            this.ctx.strokeStyle = next_color;
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.globalAlpha = 1;
        };
        this.start = function () {
            if (state === "resting") {
                window.clearInterval(timerColorfade);
                window.clearInterval(timerStart);
                window.clearInterval(timerEnd);
                window.clearInterval(timerAlpha);
                window.clearInterval(timerRot);
                window.clearTimeout(timerColorfade);
                window.clearTimeout(timerStart);
                window.clearTimeout(timerEnd);
                window.clearTimeout(timerAlpha);
                window.clearTimeout(timerRot);
                start = 0;
                end = 0;
                rot = 0;
                current_color = this.colors[0];
                next_color = this.colors[1];
                color_mul = 0;
                alpha = 1;
                cycles = 0;
                curr_color_index = 0;
                state = "spinning";
                nextCycle();
            }
        };
        this.finish = function () {
            if (state === "spinning") {
                //finish the animation
                state = "resting";
            }
        };
        this.toggle = function () {
            if (state === "spinning") {
                state = "resting";
            } else if (state === "resting") {
                this.start();
            }
        };
        this.getState = function () {
            return state;
        };

        var nextCycle = function () {
            timerStart = Util.animate(timerStart, Util.accelerateDecelerateInterpolator, cycle - offset, function (frac) {
                start = frac;
            }, function () {
                timerColorfade = Util.animate(timerColorfade, Util.linearInterpolator, color_fade_duration, function (frac) {
                    color_mul = frac;
                }, function () {
                    curr_color_index++;
                    if (curr_color_index === this.colors.length)
                        curr_color_index = 0;
                    current_color = this.colors[curr_color_index];
                    var nxt = curr_color_index + 1 >= this.colors.length ? 0 : curr_color_index + 1;
                    next_color = this.colors[nxt];
                    color_mul = 0;
                }.bind(this), offset - (color_fade_duration / 2), no_paint_req);
            }.bind(this), 0, no_paint_req);
            timerEnd = Util.animate(timerEnd, Util.accelerateDecelerateInterpolator, cycle - offset, function (frac) {
                end = frac;
            }, function () {
            }, offset, no_paint_req);
            if (state === "spinning") {
                window.setTimeout(function () {
                    nextCycle();
                }, cycle);
            } else {
                window.clearInterval(timerColorfade);
                window.clearTimeout(timerColorfade);
                timerAlpha = Util.animate(timerAlpha, Util.linearInterpolator, 100, function (frac) {
                    alpha = 1 - frac;
                }, function () {
                    window.clearInterval(timerStart);
                    window.clearInterval(timerEnd);
                    window.clearInterval(timerAlpha);
                    window.clearInterval(timerRot);
                    window.clearInterval(timerColorfade);
                    window.clearTimeout(timerStart);
                    window.clearTimeout(timerEnd);
                    window.clearTimeout(timerAlpha);
                    window.clearTimeout(timerRot);
                }, 0, no_paint_req);
            }

            if (cycles % cycle_count === 0) {
                timerRot = Util.animate(timerRot, Util.linearInterpolator, cycle * 5, function (frac) {
                    rot = angular_rotation * frac;
                }, function () {
                }, 0, no_paint_req);
            }
            cycles++;
        }.bind(this);
        this.start();
    };
    CanvasElements.CustomElement = function CustomElement(o) {
        if (o === null || o === undefined)
            o = {};
        CanvasElements.Element(this, o);
    };
    function Tooltip() {
        this.text = "";
        this.state = TooltipState.Hidden;
        this.font = ("12px " + CanvasElementManager.canvasfont);

        var padding = 4;
        var mul;
        var curr_mul;
        var anim_timer;
        var anim_duration = 100;
        var font_size = parseFloat(this.font.split(" ")[0].substring(0, this.font.split(" ")[0].length - 2));

        this.paint = function () {
            ctx.fillStyle = "#FFF";
            ctx.globalAlpha = 1 * mul;
            ctx.strokeStyle = "rgba(0, 0, 0, " + (0.3 * mul) + ")";
            roundRect(this.x, this.y, this.w, this.h, 0, true, true);
            ctx.fillStyle = "#000";
            ctx.globalAlpha = 0.54 * mul;
            ctx.font = this.font;
            ctx.fillText(this.text, this.x + padding, this.y + padding + (font_size) - 1);
            ctx.globalAlpha = 1;
        };
        this.new = function (text) {
            if (this.state !== TooltipState.OnHide && this.state !== TooltipState.Hidden) {
                this.toggle(undefined, function () {
                    this.toggle(text);
                }.bind(this));
            } else {
                this.toggle(text);
            }
        };
        this.hide = function () {
            if (this.state !== TooltipState.OnHide && this.state !== TooltipState.Hidden) {
                this.toggle();
            }
        };
        this.toggle = function (text, onclose) {
            if (text !== undefined)
                this.text = text;
            if (this.text === "_none")
                return null;
            //calculate x, y, w, h
            if (this.state === TooltipState.OnHide || this.state === TooltipState.Hidden) {
                this.x = mouse_x + 5;
                this.y = mouse_y;
                ctx.font = this.font;
                this.w = ctx.measureText(this.text).width + (2 * padding);
                this.h = font_size + (2 * padding);
            }

            var state = this.state + 0;
            if (state === TooltipState.Hidden) {
                this.state = TooltipState.OnShow;
                anim_timer = Util.animate(anim_timer, decelerateInterpolator, anim_duration, function (frac) {
                    mul = interpolate(frac, 0, 1);
                }.bind(this), function () {
                    this.state = TooltipState.Shown;
                }.bind(this));
            }
            if (state === TooltipState.Shown) {
                this.state = TooltipState.OnHide;
                anim_timer = Util.animate(anim_timer, decelerateInterpolator, anim_duration, function (frac) {
                    mul = interpolate(frac, 1, 0);
                }.bind(this), function () {
                    if (onclose !== undefined)
                        onclose();
                    this.state = TooltipState.Hidden;
                }.bind(this));
            }
            if (state === TooltipState.OnShow) {
                window.clearInterval(anim_timer);
                curr_mul = mul + 0;
                this.state = TooltipState.OnHide;
                anim_timer = Util.animate(anim_timer, decelerateInterpolator, anim_duration, function (frac) {
                    mul = interpolate(frac, curr_mul, 0);
                }.bind(this), function () {
                    if (onclose !== undefined)
                        onclose();
                    this.state = TooltipState.Hidden;
                }.bind(this));
            }
            if (state === TooltipState.OnHide) {
                window.clearInterval(anim_timer);
                curr_mul = mul + 0;
                this.state = TooltipState.OnShow;
                anim_timer = Util.animate(anim_timer, decelerateInterpolator, anim_duration, function (frac) {
                    mul = interpolate(frac, curr_mul, 1);
                }.bind(this), function () {
                    this.state = TooltipState.Shown;
                }.bind(this));
            }
        };
    }
    function ToastInstance(canvas) {
        //settings
        var height = 40;
        var font_size = 12;
        var padding_left = 10;

        //local variables
        var action_button = undefined;
        var shown = false;
        var anim_timer = null;
        var timeout_timer = null;
        var current_message = null;
        var current_length = 0;

        this.yy = 0;
        this.x = 0;
        this.h = height;
        this.enabled = true;
        this.focused = false;

        this.show = function (message, length, action_text, action) {
            if (message === undefined) return;
            var showImpl = function showImpl() {
                shown = true;
                current_message = message;
                var h_curr = this.yy + 0;
                anim_timer = Util.animate(anim_timer, decelerateInterpolator, 195, function (frac) {
                    this.yy = interpolate(frac, h_curr, height);
                }.bind(this));
                var ms = 0;
                var no_timeout = false;
                if (length === Toast.LENGTH_LONG) ms = Toast.LENGTH_LONG_MS;
                else if (length === Toast.LENGTH_SHORT) ms = Toast.LENGTH_SHORT_MS;
                else if (length === Toast.LENGTH_INDEFINATE) no_timeout = true;
                else if (length >= 0) ms = length;
                else return;
                if (!no_timeout) {
                    window.clearTimeout(timeout_timer);
                    timeout_timer = window.setTimeout(function () { this.hide(); }.bind(this), ms);
                }
            }.bind(this);
            if (shown) {
                this.hide(function () { showImpl(); });
            } else showImpl();
        }
        this.hide = function (callback) {
            if (!shown) return;
            var h_curr = this.yy + 0;
            anim_timer = Util.animate(anim_timer, decelerateInterpolator, 195, function (frac) {
                this.yy = interpolate(frac, h_curr, 0);
            }.bind(this), function () {
                shown = false;
                if (callback !== undefined)
                    callback();
            });
        }
        this.paint = function (alpha) {
            alpha = alpha === undefined ? 1 : alpha;
            //draw background
            ctx.fillStyle = Colors.grey_900;
            ctx.globalAlpha = alpha;
            ctx.fillRect(0, canvas.scaledHeight - this.yy, canvas.scaledWidth, height);
            //draw text
            ctx.globalAlpha = 0.87 * alpha;
            ctx.fillStyle = "#FFF";
            ctx.font = font_size + "px " + CanvasElementManager.canvasfont;
            ctx.fillText(current_message, padding_left, (canvas.scaledHeight - this.yy) + height / 2 + font_size / 2);
            //reset alpha
            ctx.globalAlpha = 1;

            this.w = canvas.scaledWidth;
            this.y = canvas.scaledHeight - this.yy;
            if (CanvasElementManager.showlayoutbounds) drawLayoutBounds(this);
        }
    };
    Toast.LENGTH_SHORT = -1;
    Toast.LENGTH_LONG = -2;
    Toast.LENGTH_SHORT_MS = 1500;
    Toast.LENGTH_LONG_MS = 2750;
    Toast.LENGTH_INDEFINATE = -3;
    Toast.show = function (message, length, action_text, action) {
        for (var i = 0; i < CanvasElementManagerCount; i++) {
            var mgr = CanvasElementManagerReferences[i];
            if (mgr.enabled) {
                mgr.toast.show(message, length, action_text, action);
            }
        }
    }
    Toast.hide = function () {
        for (var i = 0; i < CanvasElementManagerCount; i++) {
            var mgr = CanvasElementManagerReferences[i];
            mgr.toast.hide();
        }
    }
    Spinner.createInstance = function () {
        var _canvas = document.getElementById("material-spinner");
        var _ctx = _canvas.getContext("2d");
        var r = _canvas.scaledWidth > _canvas.scaledHeight ? _canvas.scaledHeight : _canvas.scaledWidth;
        var offs = r * (5 / 33);
        var spinner = new CanvasElements.Spinner({
            x: offs / 2,
            y: offs / 2,
            w: _canvas.scaledWidth - offs,
            h: _canvas.scaledHeight - offs,
            ctx: _ctx
        });
        var timer = window.setInterval(function () {
            _ctx.clearRect(0, 0, _canvas.scaledWidth, _canvas.scaledHeight);
            spinner.paint();
        }, 1000 / 60);
        return spinner;
    };

    //private methods
    function requestPaint() {
        CanvasElementManager.paint_needed = true;
        rootManager.paint_needed = true;
    }
	this.requestPaint = function() {
        CanvasElementManager.paint_needed = true;
        rootManager.paint_needed = true;
    }
    function intersectsMouse(x, y, w, h) {
        return mouse_x <= (x + w) && mouse_x > x && mouse_y <= (y + h) && mouse_y > y;
    }
    function roundRect(x, y, width, height, radius, fill, stroke, do_not_close) {
        if (typeof stroke === 'undefined') {
            stroke = true;
        }
        if (typeof radius === 'undefined') {
            radius = 5;
        }
        if (typeof radius === 'number') {
            radius = {tl: radius, tr: radius, br: radius, bl: radius};
        } else {
            var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
            for (var side in defaultRadius) {
                radius[side] = radius[side] || defaultRadius[side];
            }
        }
        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        if (!do_not_close)
            ctx.closePath();
        if (fill) {
            ctx.fill();
        }
        if (stroke) {
            ctx.stroke();
        }

    }
    function interpolate(fraction, start, end) {
        return start + (fraction * (end - start));
    }
    function whichSet(a, b) {
        if (a === undefined && b === undefined)
            return -1;
        if (a !== undefined && b === undefined)
            return 0;
        if (a === undefined && b !== undefined)
            return 1;
        if (a === undefined && b === undefined)
            return -2;
    }
    function type(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1);
    }
    var accelerateDecelerateInterpolator = function (t) {
        var value = 0;
        if (t <= 0.5)
            value = Math.pow(t * 2, interpolationWeight) / 2;
        else
            value = 0.5 + (1 - Math.pow(2 - t * 2, interpolationWeight)) / 2;
        return value;
    };
    var assymetricInterpolator = function (t) {
        var value = 0;
        var r = anim_assymetric_ratio;
        var x = t;
        if (t <= anim_assymetric_ratio)
            value = accelerateInterpolator(t / anim_assymetric_ratio) * anim_assymetric_ratio;
        else
            value = (1 - r) * (1 - Math.pow((1 / (1 - r) * (1 - x)), interpolationWeight)) + r;
        return value;
    };
    var decelerateInterpolator = function (t) {
        return 1 - Math.pow(1 - t, interpolationWeight);
    };
    var squareInterpolator = function (t) {
        return 1 - Math.pow(1 - t, 2);
    };
    var accelerateInterpolator = function (t) {
        return Math.pow(t, interpolationWeight);
    };
    var linearInterpolator = function (t) {
        return t;
    };
    function drawLayoutBounds(obj) {
        var c = obj.focused ? "rgb(100, 200, 0)" : "rgb(255, 0, 0)";
        if (!obj.enabled)
            c = "rgb(100, 100, 255)";
        var line = 1;
        var size = 10;
        var padding = 2;
        var corners = true;
        var text = true;
        var fill = true;
        ctx.fillStyle = c;

        if (corners) {
            ctx.globalAlpha = 0.5;
            ctx.fillRect(obj.x, obj.y, size, line);
            ctx.fillRect(obj.x, obj.y, line, size);
            ctx.fillRect(obj.x + obj.w - size, obj.y, size, line);
            ctx.fillRect(obj.x + obj.w - line, obj.y, line, size);
            ctx.fillRect(obj.x, obj.y + obj.h - line, size, line);
            ctx.fillRect(obj.x, obj.y + obj.h - size, line, size);
            ctx.fillRect(obj.x + obj.w - size, obj.y + obj.h - line, size, line);
            ctx.fillRect(obj.x + obj.w - line, obj.y + obj.h - size, line, size);
        }
        if (fill) {
            ctx.globalAlpha = 0.1;
            ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
        }
        if (text) {
            ctx.globalAlpha = 1;
            ctx.font = "10px monospace";
            ctx.fillText(obj.constructor.name, obj.x + padding, obj.y + 5 + padding);
            ctx.fillText("MGR: " + obj.manager.ID, obj.x + obj.w - ctx.measureText("MGR: " + obj.manager.ID).width - padding, obj.y + 5 + padding);
        }
    }
    function getName(obj) {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec(obj.constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    }

    //CONSTANTS
    var interpolationWeight = 4; //The exponent of T in an interpolator
    var anim_assymetric_ratio = 0.3;

    var rootManager = this;
    for (var i = 0; i < CanvasElementManagerCount; i++) {
        var mgr = CanvasElementManagerReferences[i];
        //mgr.enabled = false;
    }
    if (!no_events)
        CanvasElementManagerReferences.push(rootManager);

    CanvasElementManager.isInputFocused = function () {
        var result = false;
        for (var i = 0; i < CanvasElementManagerCount; i++) {
            var m = CanvasElementManagerReferences[i];
            if (m.enabled) {
                for (var j = 0; j < m.elements.length; j++) {
                    if (m.elements[j].constructor.name === "Panel") {
                        result = result || m.elements[j].isInputFocused();
                    } else if (m.elements[j].constructor.name === "Input") {
                        result = result || m.elements[j].focused;
                    }
                    if (result)
                        break;
                }
            }
        }
        return result;
    };
}


//enums
var Gravity = {
    None: 0,
    Top: 1,
    Right: 2,
    Bottom: 3,
    Left: 4,
    TopRight: 5,
    TopLeft: 6,
    BottomRight: 7,
    BottomLeft: 8,
    Center: 9,
    CenterHorizontal: 10,
    CenterVertical: 11
};
var Position = {
    Relative: 1,
    Absolute: 2
};
var PanelType = {
    None: 0,
    Card: 1,
    Frame: 2
};
var DropdownState = {
    Closed: 0,
    OnOpen: 1,
    Opened: 2,
    OnClose: 3
};
var CheckboxState = {
    UnChecked: 0,
    OnCheck: 1,
    Checked: 2,
    OnUnCheck: 3
};
var DialogState = {
    Closed: 0,
    OnOpen: 1,
    Opened: 2,
    OnClose: 3
};
//TODO regex lolz
var AllowedChars = {
    Numbers: "+-0123456789",
    NumbersFraction: "+-0123456789.",
    Alphabet: "abcdefghijklmnopqrstuvwxyzáâæàåãäçéêèëíìïñóôòøöœúûùüÿÁÂÆÀÅÃÄÇÉÊÈËÍÍÌÏÑÓÔØÕÖŒßÚÛÙÜŸ ",
    AlphaNumeric: "0123456789.,abcdefghijklmnopqrstuvwxyzáâæàåãäçéêèëíìïñóôòøöœúûùüÿÁÂÆÀÅÃÄÇÉÊÈËÍÍÌÏÑÓÔØÕÖŒßÚÛÙÜŸ ",
    All: "all"
};
var ButtonShape = {
    Rectangular: 0,
    Circular: 1
};
var ButtonState = {
    UnChecked: 0,
    OnCheck: 1,
    Checked: 2,
    OnUnCheck: 3
};
var TooltipState = {
    Hidden: 0,
    OnShow: 1,
    Shown: 2,
    OnHide: 3
};
var DividerType = {
    Horizontal: 0,
    Vertical: 1
};
CanvasElementManager(undefined, true);



