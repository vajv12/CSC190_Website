import { Media1, Media2 } from '../../../components/Media'; // Adjust the import path based on your project structure

describe('Media Links Data', () => {
  describe('Media1', () => {
    it('contains the correct links and titles', () => {
      expect(Media1).toEqual([
        {
          img: expect.any(String),
          title: "youtube",
          href: "https://www.youtube.com/channel/UCLXZYz1W28wHGWhjYSmiPtQ/videos"
        },
        {
          img: expect.any(String),
          title: "facebook",
          href: "https://www.facebook.com/GEGsacramento"
        },
        {
          img: expect.any(String),
          title: "instagram",
          href: "https://www.instagram.com/explore/locations/252481501/great-escape-games-and-comics/?hl=en"
        },
        {
          img: expect.any(String),
          title: "discord",
          href: "https://discord.com/invite/QqpvvqK"
        }
      ]);
    });
  });

  describe('Media2', () => {
    it('contains the correct links and titles', () => {
      expect(Media2).toEqual([
        {
          img: expect.any(String),
          title: "youtube",
          href: "https://www.youtube.com/channel/UCLXZYz1W28wHGWhjYSmiPtQ/videos"
        },
        {
          img: expect.any(String),
          title: "facebook",
          href: "https://www.facebook.com/GEGRocklin/"
        },
        {
          img: expect.any(String),
          title: "discord",
          href: "https://discord.com/invite/e9sqADWfem"
        }
      ]);
    });
  });
});
