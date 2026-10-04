import africa_map from '@/assets/dereal/image.jpg';
import vscode from '@/assets/dereal/image.png';
import ai from '@/assets/dereal/image0.jpg';
import picsart from '@/assets/dereal/image1.jpg';
import smoker from '@/assets/dereal/image2.jpg';
import notebookllm from '@/assets/dereal/image3.jpg';
import copy from '@/assets/dereal/image4.jpg';
import drive from '@/assets/dereal/image5.jpg';
import star from '@/assets/dereal/image6.jpg';
import dclogo1 from '@/assets/dereal/image7.jpeg';
import dclogo2 from '@/assets/dereal/image8.jpeg';
import logo from '@/assets/dereal/logo3.png';
import { ImageSourcePropType } from 'react-native';

interface Assets { 
    id: string;
    image: ImageSourcePropType;
    price: number;
};

export const assets: Assets[] = [
    { id: '1', image: africa_map, price: 100 },
    { id: '2', image: vscode, price: 200 },
    { id: '3', image: logo, price: 300 },
    { id: '4', image: ai, price: 400 },
    { id: '5', image: picsart, price: 500 },
    { id: '6', image: smoker, price: 600 },
    { id: '7', image: notebookllm, price: 700 },
    { id: '8', image: copy, price: 800 },
    { id: '9', image: drive, price: 900 },
    { id: '10', image: star, price: 1000 },
    { id: '11', image: dclogo1, price: 1100 },
    { id: '12', image: dclogo2, price: 1200 }
];