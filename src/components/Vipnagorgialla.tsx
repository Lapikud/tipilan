import localFont from 'next/font/local';

// Style 'only' has normal and italic for some reason.
// It uses the weight to determine the style used.
export const vipnagorgialla = localFont({
  src: [
    {
      path: '../app/fonts/vipnagorgialla/Vipnagorgialla-Rg.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../app/fonts/vipnagorgialla/Vipnagorgialla-Rg-It.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../app/fonts/vipnagorgialla/Vipnagorgialla-Bd.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../app/fonts/vipnagorgialla/Vipnagorgialla-Bd-It.otf',
      weight: '700',
      style: 'italic',
    },
  ],
});