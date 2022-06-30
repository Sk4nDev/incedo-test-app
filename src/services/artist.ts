import { Response } from 'express';
import axios from 'axios';
import { Parser } from 'json2csv';
import { Artist } from '../models/artist';
import { getConfigValue } from '../config/config';
import demoData from '../../static/demo.json';

const baseUrl = getConfigValue('API_BASE_URL');
const apiKey = getConfigValue('API_KEY');

export const getDataSource = async (searchText: string): Promise<Artist[] | never> => {
  const endPoint = `${baseUrl}/?method=artist.search&artist=${searchText}&api_key=${apiKey}&format=json`;
  const { data } = await axios.get(endPoint);
  return data?.results?.artistmatches?.artist as Artist[] || [];
};

export const getArtists = async (searchText: string, res: Response) => {
  try {
    let artists: Artist[] = [];
    for (const randomName of [...[searchText], ...demoData]) {
      artists = await getDataSource(randomName);
      if (artists.length) {
        break;
      }
    }

    if (!artists.length) {
      throw new Error('No data found!');
    }

    exportArtists({ data: artists, res, searchText });
  } catch (err: any) {
    res.status(403).json({
      message: err?.message || 'Invalid API key!'
    });
  }
};

const exportArtists = (input : { data: Artist[], res: Response, searchText: string }) => {
  const { data, res, searchText } = input;
  const artists = data.map((artist: any) => {
    return {
      name: artist.name,
      mbid: artist.mbid,
      url: artist.url,
      image_small: artist.image.find((item: any) => item.size === 'small')['#text'],
      image: artist.image.find((item: any) => item.size === 'extralarge')['#text']
    };
  });

  const filename = `Artists-${searchText}-${Date.now()}`;
  const fields = [
    {
      label: 'Name',
      value: 'name'
    },
    {
      label: 'mbid',
      value: 'mbid'
    },
    {
      label: 'URL',
      value: 'url'
    },
    {
      label: 'Small Image',
      value: 'image_small'
    },
    {
      label: 'Image',
      value: 'image'
    }
  ];

  const delimiter = getConfigValue('CSV_DELIMITER', ',');
  const json2csvParser = new Parser({ fields, delimiter });
  const csv = json2csvParser.parse(artists);
  res.set('Content-Disposition', ['attachment; filename=', filename, '.csv'].join(''));
  res.end(csv);
};
