window.onload = function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var dataHash = {
        'lineColor': 'black',
        'lineWidth': 2,
        'eraserSize': 10
    };

    autoSetCanvasSize(canvas);

    listenToUser(canvas);

    var eraserEnable = false;
    var penFunction = document.querySelector('div.penFunction');
    var pen = document.getElementById('pen');
    pen.onclick = function () {
        eraserEnable = false;
        pen.classList.add('active');
        eraser.classList.remove('active');
        penFunction.classList.add('active');
        eraserFunction.classList.remove('active');
    };

    var eraser = document.getElementById('eraser');
    var eraserFunction = document.querySelector('div.eraserFunction');
    eraser.onclick = function () {
        eraserEnable = true;
        pen.classList.remove('active');
        eraser.classList.add('active');
        penFunction.classList.remove('active');
        eraserFunction.classList.add('active');
    };

    var bin = document.getElementById('bin');
    bin.onclick = function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    var colors = document.querySelectorAll('ol.colors > li');
    for (let i in colors) {
        colors[i].onclick = function (e) {
            dataHash['lineColor'] = e.currentTarget.id;
            e.currentTarget.classList.add('active');
            removeSiblingsActive(e.currentTarget);
        };
    };

    var lineSizes = document.querySelectorAll('ol.lineSize > li');
    for (let i in lineSizes) {
        lineSizes[i].onclick = function(e) {
            e.currentTarget.classList.add('active');
            switch(e.currentTarget.id) {
                case 'thin':
                    dataHash['lineWidth'] = 2;
                    break;
                case 'middle':
                    dataHash['lineWidth'] = 5;
                    break;
                case 'thick':
                    dataHash['lineWidth'] = 8;
                    break;
            };
        };
    };

    var eraserSizes = document.querySelectorAll('ol.eraserSizes >li');
    for (let i in eraserSizes) {
        eraserSizes[i].onclick = function(e) {
            e.currentTarget.classList.add('active');
            switch(e.currentTarget.id) {
                case 'small':
                    dataHash['eraserSize'] = 10;
                    break;
                case 'middle':
                    dataHash['eraserSize'] = 15;
                    break;
                case 'big':
                    dataHash['eraserSize'] = 20;
                    break;
            };
            removeSiblingsActive(e.currentTarget);
            removeSiblingsActive(e.currentTarget);
        }
    }

    /*utilites*/
    function removeSiblingsActive(elem) {
        var siblings = getSiblings(elem);
        for(let i in siblings) {
            siblings[i].classList.remove('active');
        };
    }

    function autoSetCanvasSize(canvas) {
        setCanvasSize(canvas);
        //listen on window resize
        window.onresize = function () {
            setCanvasSize(canvas);
        };

        function setCanvasSize(canvas) {
            var pageWidth = document.documentElement.clientWidth;
            var pageHeight = document.documentElement.clientHeight;
            canvas.width = pageWidth;
            canvas.height = pageHeight;
        };
    }

    function listenToUser(canvas) {
        var usingCanvas = false;
        var lastPoint = {
            x: undefined,
            y: undefined
        };

        // check if the device support touch or mouse
        if (document.body.ontouchstart !== undefined) {
            canvas.ontouchstart = function (e) {
                usingCanvas = true;
                var x = e.touches[0].clientX;
                var y = e.touches[0].clientY;
                if (usingCanvas) {
                    if (eraserEnable) {
                        context.clearRect(x - dataHash['eraserSize']/2, y - dataHash['eraserSize']/2, dataHash['eraserSize'], dataHash['eraserSize']);
                    } else {
                        // drawCircle(x,y);
                        lastPoint = {
                            "x": x,
                            "y": y
                        };
                    }
                }
            }

            canvas.ontouchmove = function (e) {
                var x = e.touches[0].clientX;
                var y = e.touches[0].clientY;
                if (usingCanvas) {
                    if (eraserEnable) {
                        context.clearRect(x - dataHash['eraserSize']/2, y - dataHash['eraserSize']/2, dataHash['eraserSize'], dataHash['eraserSize']);
                    } else {
                        var newPoint = {
                            "x": x,
                            "y": y
                        };
                        // drawCircle(x,y);
                        drawLine(lastPoint.x, lastPoint.y, x, y);
                        lastPoint = newPoint;
                    }
                }
            }

            canvas.ontouchend = function (e) {
                usingCanvas = false;
            }
        } else {
            canvas.onmousedown = function (e) {
                usingCanvas = true;
                var x = e.clientX;
                var y = e.clientY;
                if (usingCanvas) {
                    if (eraserEnable) {
                        context.clearRect(x - dataHash['eraserSize']/2, y - dataHash['eraserSize']/2, dataHash['eraserSize'], dataHash['eraserSize']);
                    } else {
                        // drawCircle(x,y);
                        lastPoint = {
                            "x": x,
                            "y": y
                        };
                    }
                }
            }

            canvas.onmousemove = function (e) {
                var x = e.clientX;
                var y = e.clientY;
                if (usingCanvas) {
                    if (eraserEnable) {
                        context.clearRect(x - dataHash['eraserSize']/2, y - dataHash['eraserSize']/2, dataHash['eraserSize'], dataHash['eraserSize']);
                    } else {
                        var newPoint = {
                            "x": x,
                            "y": y
                        };
                        // drawCircle(x,y);
                        drawLine(lastPoint.x, lastPoint.y, x, y);
                        lastPoint = newPoint;
                    }
                }
            };
            canvas.onmouseup = function (e) {
                usingCanvas = false;
            };
        }
    }

    function drawLine(x1, y1, x2, y2) {
        context.beginPath();
        context.strokeStyle = dataHash['lineColor'];
        context.lineWidth = dataHash['lineWidth'];
        context.lineJoin = 'round';
        context.lineCap = 'round';
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.closePath();
        context.stroke();
    }

    /**
    * Get siblings of an element
    * @param  {Element} elem
    * @return {Object}
    */
    function getSiblings(elem) {
        var siblings = [];
        var sibling = elem.parentNode.firstChild;
        var skipMe = elem;
        for (; sibling; sibling = sibling.nextSibling)
            if (sibling.nodeType == 1 && sibling != elem)
                siblings.push(sibling);
        return siblings;
    }
}