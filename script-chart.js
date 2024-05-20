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
    // console.log("Värden:", values);

    // Hämta ut länder och årtal
    const labels = dataSCB.data.map((value) => value.key[0]);
    // console.log("Etiketter, länder:", labels);

    const years = dataSCB.data.map((value) => value.key[4]);
    // console.log("Etiketter, år:", years);

    // Gör om labels till unika värden
    // const uniqueLabels = [...new Set(labels)];
    const uniqueYears = [...new Set(years)];

    // console.log("Unika labels:", uniqueLabels);

    // const splitValue = values.slice(14);
    // const splitValue2 = values.slice(28);

    const datasets = [
      {
        label: "Denmark",
        // data: uniqueValues,
        data: values.slice(0, 14),
      },
      {
        label: "India",
        // data: uniqueValues,
        data: values.slice(14, 28),
      },

      {
        label: "Japan",
        // data: uniqueValues,
        data: values.slice(28, 42),
      },

      {
        label: "China",
        // data: uniqueValues,
        data: values.slice(42, 56),
      },

      {
        label: "Norway",
        // data: uniqueValues,
        data: values.slice(56, 70),
      },

      {
        label: "Sweden",
        // data: uniqueValues,
        data: values.slice(70, 84),
      },
      {
        label: "Germany",
        // data: uniqueValues,
        data: values.slice(84, 98),
        // backgroundColor: "maroon",
        // borderColor: "maroon",
      },

      {
        label: "United States",
        // data: uniqueValues,
        data: values.slice(98, 112),
      },
    ];

    const data = {
      labels: uniqueYears,
      datasets,
    };

    // console.log(data);

    const config = {
      type: "line",
      data,
      options: {
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
        plugins: {
          // title: {
          //   display: true,
          //   text: "Amount of CO2e released by country from 2008 to 2021",
          //   color: "#472907",
          //   font: {
          //     size: 20,
          //     family: "Inter",
          //     weight: 200,
          //   },
          // },
        },
        scales: {
          x: {
            display: true,
          },
          y: {
            display: true,
            type: "logarithmic",
            afterBuildTicks: (axis) => (axis.ticks = [10000, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000].map((v) => ({ value: v }))),
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
    console.log(dataSCB2);

    // Gör om objektets värden till en array
    const values = dataSCB2.data.map((value) => value.values[0]);
    console.log("Värden: ", values);

    const nonHazardous = values.slice(6, 12);

    const sumNonHazardous = nonHazardous.reduce(getSum, 0);
    console.log(sumNonHazardous);

    const hazardous = values.slice(0, 6);
    const sumHazardous = hazardous.reduce(getSum, 0);
    function getSum(total, num) {
      return total + Math.round(num);
    }
    console.log(sumHazardous);

    // Hämta ut kategori
    const labels = dataSCB2.data.map((value) => value.key[0]);
    console.log("Kategori: ", labels);

    //Lägg ihop alla värden per kategori
    const uniqueCategories = [...new Set(labels)];

    const datasets = [
      {
        // labels: ["ofarlig", "farlig"],
        data: [sumHazardous, sumNonHazardous],
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
            hoverOffset: 30,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    };
    const canvas2 = document.getElementById("chartSCB2");
    const myChart2 = new Chart(canvas2, config2);
  });
