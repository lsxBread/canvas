window.onload = function() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var dataHash = {
        'lineColor': 'black',
        'lineWidth': 5
    };

    autoSetCanvasSize(canvas);

    listenToMouse(canvas);

    var eraserEnable = false;
    var eraser = document.getElementById('eraser');
    var brush = document.getElementById('brush');
    var actions = document.getElementById('actions');
    eraser.onclick = function() {
        eraserEnable = true;
        actions.className = 'actions active';
    };
    brush.onclick = function() {
        eraserEnable = false;
        actions.className = 'actions';
    };

    /*utilites*/
    function autoSetCanvasSize(canvas) {
        setCanvasSize(canvas);
        //listen on window resize
        window.onresize = function() {
            setCanvasSize(canvas);
        };

        function setCanvasSize(canvas) {
            var pageWidth = document.documentElement.clientWidth;
            var pageHeight = document.documentElement.clientHeight;
            canvas.width = pageWidth;
            canvas.height = pageHeight;
        };
    }

    function listenToMouse(canvas) {
        var usingCanvas = false;
        var lastPoint = {
            x: undefined,
            y: undefined
        };

        canvas.onmousedown = function(e) {
            usingCanvas = true;
            var x = e.clientX;
            var y = e.clientY;
            if (usingCanvas) {
                if (eraserEnable) {
                    context.clearRect(x-5,y-5,10,10);
                } else {
                    // drawCircle(x,y);
                    lastPoint = {
                        "x": x,
                        "y": y
                    };
                }
            }
        }

        canvas.onmousemove = function(e){
            var x = e.clientX;
            var y = e.clientY;
            if (usingCanvas) {
                if (eraserEnable) {
                    context.clearRect(x-5,y-5,10,10);
                } else {
                    var newPoint = {
                        "x": x,
                        "y": y
                    };
                    // drawCircle(x,y);
                    drawLine(lastPoint.x, lastPoint.y,x,y);
                    lastPoint = newPoint;
                }
            }
        };
        canvas.onmouseup = function(e){
            usingCanvas = false;
        };
    }

    function drawLine(x1,y1,x2,y2) {
        context.beginPath();
        context.strokeStyle = dataHash['lineColor'];
        context.lineWidth = dataHash['lineWidth'];
        context.lineJoin = 'round';
        context.lineCap = 'round';
        context.moveTo(x1,y1);
        context.lineTo(x2,y2);
        context.closePath();
        context.stroke();
    }

    function drawCircle(x,y) {
        context.beginPath();
        context.fillStyle = dataHash['lineColor'];
        context.arc(x,y,dataHash['lineWidth'],0,Math.PI * 2);
        context.fill();
    }
}