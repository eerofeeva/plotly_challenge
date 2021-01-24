var samplesNames;
var metadata;
var samples;
var resultsmetadata;
var resultsarray;
var teststring;
var values;
var ids;
var hovertext;

function getResults(sampleId)
{
    resultsarray= samples.filter(sampleobject => sampleobject.id == sampleId)[0];
    resultsmetadata = metadata.filter(sampleobject => sampleobject.id == sampleId)[0];

    console.log('in getResults sampleId:' + sampleId );

    // Use `sample_values` as the values for the bar chart. - my Y values
    values = resultsarray.sample_values;
    // Use `otu_ids` as the labels for the bar chart. - my X values
    ids = resultsarray.otu_ids;     
    // Use `otu_labels` as the hovertext for the chart.
    hovertext = resultsarray.otu_labels;

    console.log('in getResults resultsarray:' + resultsarray);
}

function optionChanged(sampleId)
{
    getResults(sampleId);
    setMetadata();
    setBarChart();
}

function setMetadata()
{
    var sample_metadata = d3.select("#sample-metadata");
    sample_metadata.html("");
    Object.entries(resultsmetadata).forEach(([key, value]) => {
        sample_metadata.append("h6").text(`${key}: ${value}`);
    });
}

function setBarChart()
{
console.log('in setBarChart; ids '+ ids + ' values ' + values + ' hovertext ' + hovertext);
    var trace_bar = {
        x: ids.slice(0,10),
        y: values.slice(0,10).reverse(),
        text: hovertext.slice(0,10).reverse(),
        type: 'bar',
        orientation: 'h'
    };

    var layout = {
        title:'Top 10 Bacterial Cultures',
        margin: {t:30, l: 140}
    };

    Plotly.newPlot('bar', [trace_bar], layout)
}

function setBubbleChart(sample)
{
    console.log('in setBubbleChart ');

    var trace_bubble = {
        x: ids,
        y: values,
        text: hoverText,
        mode: 'markers',
        marker: {
            size: values,
            color: ids
        }
    };
    Plotly.newPlot('bubble', [trace_bubble]);
}

function init()
{
   //initialize selector
   var selDataset = d3.select("#selDataset");
    console.log('init, sample Names ' + samplesNames[0]);
    samplesNames.forEach((sample) => {
    selDataset
      .append("option")
      .text(sample)
      .property("value", sample);
    });

    //initialize metadata through optionChanged
    getResults(samplesNames[0]);
    setMetadata();

    //initialize bar chart
    setBarChart();    

    //initialize bubble chart
    //setBubbleChart(samplesNames[0]);
}

//assign samples and metadata globals
d3.json("samples.json").then(function(data) {
    samplesNames = data.names;
    metadata = data.metadata;
    samples = data.samples;
    console.log("in getting samples, samples[0]: " + samples[0]);
    init();
});
