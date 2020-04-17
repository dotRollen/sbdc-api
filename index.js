const request = require("request");
const fs = require("fs");

const sbdcApi = "https://ssd-api.jpl.nasa.gov/cad.api";

// Default API usage
const questionOne = () => {
  request(sbdcApi, (err, resp, body) => {
    if (err) {
      console.log(err);
      return;
    }

    if (resp) {
      const dateObj = JSON.parse(body);
      console.log(dateObj);
    }
  });
};

// From now till end of year
const questionTwo = () => {
  request(`${sbdcApi}?date-min=now&date-max=2020-12-31`, (err, resp, body) => {
    if (err) {
      console.log(err);
      return;
    }

    if (resp) {
      const dateObj = JSON.parse(body);
      console.log(dateObj);
    }
  });
};

// From now till end of year sorted by magnitude
const questionThree = () => {
  request(
    `${sbdcApi}?date-min=now&date-max=2020-12-31&sort=h`,
    (err, resp, body) => {
      if (err) {
        console.log(err);
        return;
      }

      if (resp) {
        const dateObj = JSON.parse(body);
        console.log(dateObj);
      }
    }
  );
};

// From now till end of year sorted by fullname
const questionFour = () => {
  request(
    `${sbdcApi}?fullname=true&date-min=now&date-max=2020-12-31`,
    (err, resp, body) => {
      if (err) {
        console.log(err);
        return;
      }

      if (resp) {
        const dataObj = JSON.parse(body);

        const sorted = dataObj.data.sort((a, b) => a[11] - b[11]);

        const file = fs.createWriteStream(`${__dirname}/target/list.csv`);

        console.log(sorted);
        file.on("error", (err) => console.log(err));

        for (let i = 0; i < sorted.length; i++) {
          file.write(sorted[i].join(", ") + "\n");
        }

        file.end();
      }
    }
  );
};

questionFour();
