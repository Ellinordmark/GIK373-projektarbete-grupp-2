// Linda Hedström (h22linhe), Ellinor Nordmark (h22ellno)

const autocolors = window["chartjs-plugin-autocolors"];
Chart.register(autocolors);

// ---------------------- API 1: UTSLÄPP ---------------------------

const url = "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI1301/MI1301F/MI1301MPSPINN";

const query = {
  query: [
    {
      code: "Uppkomst",
      selection: {
        filter: "item",
        values: ["DK", "IN", "JP", "CN", "NO", "SE", "DE", "US"],
      },
    },
    {
      code: "Anvandningstyp",
      selection: {
        filter: "item",
        values: ["888"],
      },
    },
    {
      code: "AmneMiljo",
      selection: {
        filter: "item",
        values: ["GHG"],
      },
    },
    {
      code: "ProdgrpSNI2007",
      selection: {
        filter: "item",
        values: ["C13-C15"],
      },
    },
  ],
  response: {
    format: "JSON",
  },
};

// Skapa ett request-objekt, metod POST då SCB kräver det. Annars GET
const request = new Request(url, {
  method: "POST",
  body: JSON.stringify(query),
});

//Ställ förfrågningar till API:et via fetch
fetch(request)
  .then((response) => response.json())
  .then((dataSCB) => {
    // console.log(dataSCB);

    // Gör om objektets värden till en array
    const values = dataSCB.data.map((value) => value.values[0]);

    // Hämta ut länder och årtal, gör årtalen unika
    const labels = dataSCB.data.map((value) => value.key[0]);

    const years = dataSCB.data.map((value) => value.key[4]);
    const uniqueYears = [...new Set(years)];

    // Dela upp värdena i olika arrayer
    const dataDK = values.splice(0, uniqueYears.length);
    const dataIN = values.splice(0, uniqueYears.length);
    const dataJP = values.splice(0, uniqueYears.length);
    const dataCN = values.splice(0, uniqueYears.length);
    const dataNK = values.splice(0, uniqueYears.length);
    const dataSE = values.splice(0, uniqueYears.length);
    const dataDE = values.splice(0, uniqueYears.length);
    const dataUS = values.splice(0, uniqueYears.length);

    const datasets = [
      {
        label: "Denmark",
        data: dataDK,
      },
      {
        label: "India",
        data: dataIN,
      },

      {
        label: "Japan",
        data: dataJP,
      },

      {
        label: "China",
        data: dataCN,
      },

      {
        label: "Norway",
        data: dataNK,
      },

      {
        label: "Sweden",
        data: dataSE,
      },
      {
        label: "Germany",
        data: dataDE,
      },

      {
        label: "United States",
        data: dataUS,
      },
    ];

    const data = {
      labels: uniqueYears,
      datasets,
    };

    const config = {
      type: "line",
      data,
      options: {
        plugins: {
          legend: {
            onHover: (event) => {
              event.native.target.style.cursor = "pointer";
            },
            onLeave: (event) => {
              event.native.target.style.cursor = "default";
            },
          },
        },

        autocolors: {
          mode: "dataset",
        },
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            borderWidth: 0.8,
            tension: 0.2,
          },
          point: {
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        },
        scales: {
          x: {
            display: true,
          },
          y: {
            display: true,
            type: "logarithmic",
            afterBuildTicks: (axis) => (axis.ticks = [10000, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000].map((v) => ({ value: v }))),
            ticks: {
              callback: function (value) {
                return value + " t";
              },
            },
          },
        },
      },
    };

    const canvas = document.getElementById("chartSCB");
    const myChart = new Chart(canvas, config);
  });

// ---------------------- API 2: AVFALL ---------------------------

const url2 = "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0305/MI0305T01C";

const query2 = {
  query: [
    {
      code: "OfarligtFarligt",
      selection: {
        filter: "item",
        values: ["O", "F"],
      },
    },
    {
      code: "SNI2007MI",
      selection: {
        filter: "item",
        values: ["C13-15"],
      },
    },
    {
      code: "Avfallsslag",
      selection: {
        filter: "item",
        values: ["TOT"],
      },
    },
  ],
  response: {
    format: "JSON",
  },
};

const request2 = new Request(url2, {
  method: "POST",
  body: JSON.stringify(query2),
});

fetch(request2)
  .then((response) => response.json())
  .then((dataSCB2) => {
    // console.log(dataSCB2);

    // Gör om objektets värden till en array
    const values = dataSCB2.data.map((value) => value.values[0]);
    // console.log("Värden: ", values);

    // Hämta ut kategori
    const labels = dataSCB2.data.map((value) => value.key[0]);
    // console.log("Kategori: ", labels);

    // Hämta ut år och gör unika
    const years = dataSCB2.data.map((value) => value.key[3]);
    const uniqueYears = [...new Set(years)];

    // Använd år för att dela arrayen
    const hazardous = values.splice(0, uniqueYears.length);
    // console.log("Farliga", hazardous);

    const nonHazardous = values.splice(0, uniqueYears.length);
    // console.log("Ofarliga", nonHazardous);

    //Summerar alla värden
    const sumNonHazardous = nonHazardous.reduce(getSum, 0);
    const sumHazardous = hazardous.reduce(getSum, 0);
    function getSum(total, num) {
      return total + Math.round(num);
    }
    // console.log(sumHazardous);

    const datasets = [
      {
        // labels: ["ofarlig", "farlig"],
        data: [sumHazardous, sumNonHazardous],
        backgroundColor: ["#849d5d", "#db7b74"],
        borderColor: ["#849d5d", "#db7b74"],
      },
    ];

    const data2 = {
      labels: ["Non-hazardous", "Hazardous"],
      datasets,
    };

    const config2 = {
      type: "doughnut",
      data: data2,
      options: {
        layout: {
          padding: {
            bottom: 20,
          },
        },
        rotation: -25,
        elements: {
          arc: {
            hoverOffset: 20,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            onHover: (event) => {
              // console.log(event.native.target.style.cursor);
              event.native.target.style.cursor = "pointer";
            },
            onLeave: (event) => {
              event.native.target.style.cursor = "default";
            },
          },
        },
      },
    };
    const canvas2 = document.getElementById("chartSCB2");
    const myChart2 = new Chart(canvas2, config2);
  });

// ---------------------- BUTTON---------------------------

let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
