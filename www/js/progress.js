/*===================================================================================================================*/
/* BAR CHART */
/*===================================================================================================================*/

// Constants
BAR_CHART_WIDTH = 960;
BAR_CHART_HEIGHT = 500;
BAR_CHART_MARGIN_TOP = 50;
BAR_CHART_MARGIN_BOTTOM = 30;
BAR_CHART_MARGIN_RIGHT = 20;
BAR_CHART_MARGIN_LEFT = 20;

function generateBarGraph(subjects, doneTasks, dateFilterCallback) {
    var graphData = [];
    var tasks = doneTasks;
    $.each(subjects, function(subjectId, subjectDict) {
        var subjectName = subjectDict.name;
        var colourclass = subjectDict.colour_scheme;
        var weeks = tasks[subjectId];
        var doneTasks = 0;
        if (weeks !== undefined) {
            $.each(weeks, function (week, tasksDict) {
                if (tasksDict !== undefined) {
                    $.each(tasksDict, function (days, taskDict) {
                        if (dateFilterCallback(taskDict.assigned_date)) {
                            doneTasks += 1;
                        }
                    });
                }
            });
        }
        graphData.push({subject: subjectName, doneTasks: doneTasks, colourClass: colourclass});
    });
    drawBarGraph(graphData);
}

// generate graph for ALL of the done tasks
function fetchAndDisplayBarGraphSinceDawnOfTime() {
    $(".chart").text(""); // clear previous contents
    fetchAllDoneTasks(generateBarGraphSinceDawnOfTime);
}
function generateBarGraphSinceDawnOfTime(subjects, doneTasks) {
    generateBarGraph(subjects, doneTasks, function() {return true;});
}

// generate graph for tasks in last 7 days (7*24 hours)
function fetchAndDisplayBarGraphForLast7Days() {
    $(".chart").text(""); // clear previous contents
    fetchAllDoneTasks(generateBarGraphForLast7Days);
}
function generateBarGraphForLast7Days(subjects, doneTasks) {
    generateBarGraph(subjects, doneTasks, function(taskDate) {
        var span = new TimeSpan(Date.now() - Date.parse(taskDate));
        return span.days <= 7;
    });
}

// generate graph for tasks in last month
function fetchAndDisplayBarGraphForLastMonth() {
    $(".chart").text(""); // clear previous contents
    fetchAllDoneTasks(generateBarGraphForLastMonth);
}

function generateBarGraphForLastMonth(subjects, doneTasks) {
    generateBarGraph(subjects, doneTasks, function(taskDate) {
        var taskAssignedDate = Date.parse(taskDate);
        var lastMonth = Date.today().add(-1).months();
        return taskAssignedDate < lastMonth;
    });
}

function drawBarGraph(data) {
    var margin = {top: BAR_CHART_MARGIN_TOP, bottom: BAR_CHART_MARGIN_BOTTOM,
                  left: BAR_CHART_MARGIN_LEFT, right: BAR_CHART_MARGIN_RIGHT},
        width = BAR_CHART_WIDTH - margin.left - margin.right,
        height = BAR_CHART_HEIGHT - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var svg = d3.select(".chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function(d) { return d.subject; }));
    y.domain([0, d3.max(data, function(d) { return d.doneTasks; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", function(d) { return "bar " + d.colourClass;})
        .attr("x", function(d) { return x(d.subject); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.doneTasks); })
        .attr("height", function(d) { return height - y(d.doneTasks); });

    // height offset of text from top of bar
    var textOffset = 5;
    svg.selectAll("text.bar")
        .data(data)
        .enter().append("text")
        .attr("class", "bar-text")
        .attr("text-anchor", "middle")
        .attr("x", function(d) { return x(d.subject) + x.rangeBand()/2; }) // we divide by 2 to put the text on the bar's centre
        .attr("y", function(d) { return y(d.doneTasks) - textOffset; })
        .text(function(d) { return d.doneTasks; });
}

/*===================================================================================================================*/
/* HEATMAP */
/*===================================================================================================================*/

var cal = new CalHeatMap();

var dataSet = {};

$(document).ready(function(){
    cal.init({
        domain: "month",
        subDomain: "day",
        range: 12,
        cellSize: 15,
        start: new Date(2015, 8, 1),
        data: dataSet,
        subDomainTextFormat: "%d"
    });
    fetchHeatmapData(prepareHeatmapData);
});


function prepareHeatmapData(heatmapSnapshot) {
    //console.log('heatmapSnapshot is:', heatmapSnapshot);
    if (heatmapSnapshot !== null) {
        $.each(heatmapSnapshot, function(date, timeDict){
            //var currentDate = Date.parse(date);
            //var epochTimestamp = currentDate.format("U");
        })
    }
}