const GOOGLE_CLIENT_ID =
  "529298102920-umvm53jv6ci2r502vdi89a0b0v1ut0rs.apps.googleusercontent.com";

const TURNSTILE_SITE_KEY = "0x4AAAAAAAh7GqmUmbpzETtz";

const PADDLE_PRICE_CONFIG = {
  DEV: {
    WEEKLY_PRICE_ID: "pri_01jrfek2n0w05fzc20zr131rga",
    MONTHLY_PRICE_ID: "pri_01jrfevksz3d233nh69sqx0azs",
    BI_ANNUALLY_PRICE_ID: "pri_01jrff13k5923d6kv3ats5cfwm",
  },
  PROD: {
    WEEKLY_PRICE_ID: "",
    MONTHLY_PRICE_ID: "",
    BI_ANNUALLY_PRICE_ID: "",
  },
};

const PADDLE_PRICE = PADDLE_PRICE_CONFIG.DEV; // Change to PROD for production
// const PADDLE_PRICE = PADDLE_PRICE_CONFIG.PROD;

module.exports = {
  GOOGLE_CLIENT_ID,
  TURNSTILE_SITE_KEY,
  PADDLE_PRICE,
};
