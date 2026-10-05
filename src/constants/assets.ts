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
import { ImageSource } from 'expo-image';
import { ImageSourcePropType } from 'react-native';

interface Assets { 
    id: string;
    name: string;
    description: string;
    image: ImageSourcePropType;
    price: number;
    moreInfo?: string;
};

export const assets: Assets[] = [
    { id: '1', image: africa_map, price: 100, name: 'Africa Map', description: 'A beautiful map of Africa.' , moreInfo: 'This map showcases the diverse landscapes and cultures of Africa, making it a perfect addition to any home or office.' },
    { id: '2', image: vscode, price: 200, name: 'Visual Studio Code', description: 'A powerful code editor.' , moreInfo: 'Visual Studio Code is a free code editor for web and cloud development.' },
    { id: '3', image: logo, price: 300, name: 'Logo', description: 'A sleek logo design.' , moreInfo: 'This logo design is perfect for any business or brand.' },
    { id: '4', image: ai, price: 400, name: 'AI Assistant', description: 'An intelligent AI assistant.' , moreInfo: 'Our AI assistant can help you with a wide range of tasks.' },
    { id: '5', image: picsart, price: 500, name: 'Picsart', description: 'A popular photo editing app.' , moreInfo: 'Picsart is a powerful photo editing app that allows you to create stunning images.' },
    { id: '6', image: smoker, price: 600, name: 'Smoker', description: 'A stylish smoker accessory.' , moreInfo: 'This stylish smoker accessory is perfect for any smoker.' },
    { id: '7', image: notebookllm, price: 700, name: 'Notebook LLM', description: 'A powerful language model for note-taking.' , moreInfo: 'This language model is perfect for taking notes and organizing your thoughts.' },
    { id: '8', image: copy, price: 800, name: 'Copy', description: 'A simple copy app.' , moreInfo: 'This copy app is perfect for quickly copying and pasting text.' },
    { id: '9', image: drive, price: 900, name: 'Drive', description: 'A cloud storage app.' , moreInfo: 'This cloud storage app is perfect for storing and accessing your files from anywhere.' },
    { id: '10', image: star, price: 1000, name: 'Star', description: 'A star-shaped accessory.' , moreInfo: 'This star-shaped accessory is perfect for adding a touch of sparkle to any outfit.' },
    { id: '11', image: dclogo1, price: 1100, name: 'DC Logo 1', description: 'A logo design for DC.' , moreInfo: 'This logo design is perfect for any DC-themed event or promotion.' },
    { id: '12', image: dclogo2, price: 1200, name: 'DC Logo 2', description: 'Another logo design for DC.' , moreInfo: 'This alternative logo design offers a fresh take on the classic DC branding.' }
];

export const Stories: {
    image: ImageSource
}[] = [
    {
        image: require('@/assets/stories/image.jpg'),
    },{
        image: require('@/assets/stories/image0.jpg'),
    },{
        image: require('@/assets/stories/image1.jpg'),
    },{
        image: require('@/assets/stories/image2.jpg'),
    },{
        image: require('@/assets/stories/image3.jpg'),
    },{
        image: require('@/assets/stories/image4.jpg'),
    },{
        image: require('@/assets/stories/image5.jpg'),
    },{
        image: require('@/assets/stories/image6.jpg'),
    },{
        image: require('@/assets/stories/image7.jpg'),
    },{
        image: require('@/assets/stories/image8.jpg'),
    },{
        image: require('@/assets/stories/image9.jpg'),
    },{
        image: require('@/assets/stories/image10.jpg'),
    },{
        image: require('@/assets/stories/image11.jpg'),
    },{
        image: require('@/assets/stories/image12.jpg'),
    },{
        image: require('@/assets/stories/image13.jpg'),
    },{
        image: require('@/assets/stories/image14.jpg'),
    },{
        image: require('@/assets/stories/image15.jpg'),
    },{
        image: require('@/assets/stories/image16.jpg'),
    },{
        image: require('@/assets/stories/image17.jpg'),
    },{
        image: require('@/assets/stories/image18.jpg'),
    },{
        image: require('@/assets/stories/image19.jpg'),
    },{
        image: require('@/assets/stories/image20.jpg'),
    },{
        image: require('@/assets/stories/image21.jpg'),
    },{
        image: require('@/assets/stories/image22.jpg'),
    },
]