(function ($) {
  var shapesSource = [
    {
      name: "Air conditioner",
      data: "m0,0 L0,50 L50,50 L50,0z",
      background: "steelblue"
    },
    {
      name: "Column",
      data: "m0,0 L0,50 L50,50 L50,0z",
      background: "red"
    },
    {
      name: "Desk",
      data: "m0,0 L0,50 L100,50 L100,0z",
      background: "Green"
    },
    {
      name: "Chair",
      data: "m0,0 L0,25 L25,25 L25,0z",
      background: "black"
    }
  ];

  $(function () {
    $("#canvas").kendoDiagram();
    var diagram = $("#canvas").data("kendoDiagram"),
      kendo = window.kendo,
      Point = kendo.diagram.Point;

    $("#canvas").kendoDropTarget({
      drop: function (e) {
        var item = e.draggable.hint.data("data"),
          pos = e.draggable.hintOffset,
          dp = diagram.documentToCanvasPoint(new Point(pos.left, pos.top)),
          normal = diagram._normalizePointZoom(dp.minus(diagram.pan()));

        diagram.addShape(normal, {"data": item["data"], connectors: []});
      }
    });

    var list = $("#toolBox").kendoListView({
      dataSource: {
        data: shapesSource
      },
      template: kendo.template($("#template").html())
      //selectable: "single"
    });

    list.kendoDraggable({
      filter: "div[role=option]",
      hint: function (row) {
        var svg = row.children("svg"),
          list = $("#toolBox").data("kendoListView"),
          item = list.dataSource.getByUid(row.data().uid);
        svg = svg.clone();
        svg.data("data", item);
        return svg;
      }
    });

    $("#splitter").kendoSplitter({
      panes: [
        { collapsible: true },
        { collapsible: false, size: "75%" }
      ]
    });

    $("#undoButton").click(function (e) {
      diagram.undo();
    });
    $("#redoButton").click(function (e) {
      diagram.redo();
    });
    $("#bringButton").click(function (e) {
      diagram.bringToFront();
    });
    $("#sendBackButton").click(function (e) {
      diagram.sendToBack();
    });

    var slider = $("#slider").kendoSlider({
      min: 0.55,
      value: 1,
      max: 2,
      smallStep: .1,
      largeStep: .2,
      tickPlacement: "none",
      change: onZoom,
      slide: onZoom
    }).data("kendoSlider");

    function onZoom(e) {
      diagram.zoom(e.value);
    }

    function getPoint(str) {
      var p = str.split(" ");
      return new Point(p[0], p[1]);
    }

    function place(obj, options) {
      var p = getPoint(obj["position"]);
      options = kendo.deepExtend({"data": obj["boundary"], "connectors": []}, options);
      if (obj["type"]) {
        switch (obj["type"]) {
          case "desk":
            options.background = "green";
            break;
          case "chair":
            options.background = "black";
            break;
        }
      }
      var s = diagram.addShape(p.plus(roomPos), options);
      var content = obj["name"] ? obj["name"] : obj["type"];
      $(s.visual.native).kendoTooltip({
        content: content,
        width: 100,
        position: "top"
      });
    }

    var roomPos = getPoint(room["position"]);

    diagram.addShape(roomPos, {data: room["boundary"], background: "gray", "connectors": []});

    var artefacts = room["artifacts"];
    for (var i = 0; i < artefacts.length; i++) {
      var a = artefacts[i];
      place(a, {background: a["obstacle"] === true ? "red" : "steelblue"})
    }

    var arrs = room["arrangements"],
      currentArr = arrs[arrs.length - 1];

    for (var i = 0; i < currentArr["objects"].length; i++) {
      place(currentArr["objects"][i]);
    }
  })
})(window.kendo.jQuery);
