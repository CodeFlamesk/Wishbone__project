/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {

    extend: {
      lineHeight: {
        '40': '40px',
        '56': '56px',
      },

      borderColor: ['focus', 'valid', 'invalid'],
      outlineColor: ['focus', 'valid', 'invalid'],
      screens: {

        'xs': '360px',
        'ft': '420px',
        'ff': '440px',
        'ftx': '500px',
        'fnin': '519px',
        'fs': '574px',
        'ss': '670px',
        'tfe': '348px',
        'mde': '800px',
        'tb': '991.98px',
        'ct': '1344px',
        '3xl': '1920px'
      },
      fontSize: {
        '32fz': '32px',
        '40': '40px',
      },

      spacing: {
        '1w': '1px',
        '17w': '17px',
        '22': '22px',
        '41': '41px',
        '43': '43px',
        '58': '58px',
        '60w': '60px',
        '67': '67px',
        '94': '94px',
        '92w': '92px',
        '108w': '108px',
        '110': '110px',
        '120w': '120px',
        '139': '139px',
        '148w': '148px',
        '183': '183px',
        '192w': '192px',
        '200w': '200px',
        '213': '213px',
        '250w': '250px',
        '279': '279px',
        '330w': '330px',
        '354': '354px',
        '400w': '400px',
        '420': '420px',
        '549': '549px',
        '600w': '600px',
        '690': '690px',
        '706': '706px',
        '959': '959px',
      },
      borderRadius: {
        '4r': '4px',
        '5r': '5px',
        '60r': '60px',
      },

    },

    colors: {
      "main": "#393939",
      "grey": "#334155",
      "blue": "#3B82F6",
      "yellow": "#FEC84B",
      "blue-lite": "#dbf4fa",
      "sl-blue": "#7FA3D6",
      "blue-600": "#1479FF",
      "grey-text-light": "#64748B",
      "text-dark": "#020617",
      "white": "#FFFFFF",
      "grey-100": "#F1F5F9",
      "grey-300": "#CBD5E1",
      "grey-700": "#334155",
      "grey-800": "#1E293B",
      "grey-900": "#0F172A",
      "primary-500": "#3B82F6",
      "grey-border": "#E2E8F0",
      "primary-100": "#E0F2FE",
      "primary-600": "#2563EB",
      "green-600": "#16A34A",
      "green-link": "#4CB051",
      "sl-main": "#F8FAFC",
      "bts-grey": "#94A3B8",
      "grey-disableColor": "#94A3B8",
      "borderSign": "#B2B5C4",
      "orange": "#EA4335",
      "black": "#000000",
      "error-600": "#DC2626",
      "red-youtube": "#fe0000",
      "primary-50": "#EFF6FF",
      "blue-scrol": "#66ccff",

    },

  },
  plugins: [],
  variants: {},

}

