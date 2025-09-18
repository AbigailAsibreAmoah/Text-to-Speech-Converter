# Text-to-Speech Frontend

A modern React application for converting text to speech with multi-language support and translation capabilities.

## Features

-  **Modern UI**: Clean, responsive design with animated spiral backgrounds and flag elements
-  **Text Input**: Large textarea with real-time character counter (2500 limit)
-  **Voice Selection**: Gender-specific voices with country flags (🇺🇸🇬🇧🇫🇷🇩🇪🇰🇷)
-  **Language Support**: English, French, German, Korean with automatic translation
-  **Speed Control**: Adjustable playback speed (0.25x to 2.0x)
-  **Download & Share**: Save MP3 files or share via native device sharing
-  **Real-time Translation**: Shows translated text before speech generation
-  **Audio Playback**: Built-in audio player with controls
-  **Mobile Responsive**: Works on all device sizes

## Technology Stack

- **React 18**: Modern React with hooks
- **CSS3**: Custom styling with gradients and animations
- **Fetch API**: HTTP requests to backend API
- **Web Audio API**: Audio blob handling and playback

## Project Structure

```
src/
├── App.js          # Main application component
├── App.css         # Application styles
└── index.js        # React entry point

public/
├── index.html      # HTML template
└── ...

build/              # Production build output
```

## Components

### App Component

Main application component that handles:
- State management for text, voice, language, and audio
- API communication with backend
- Audio processing and playback
- Translation display

## Styling

- **Design System**: Inter font family with modern typography
- **Color Palette**: Blue gradient theme with subtle shadows
- **Responsive**: Mobile-first design with breakpoints
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: Focus states and proper contrast ratios

## API Integration

The frontend communicates with the backend API:

```javascript
const response = await fetch(API_ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text, voice, language, speed })
});
```

## Audio Processing

Handles base64 audio data from the backend:

1. Receives base64-encoded MP3 data
2. Converts to binary blob
3. Creates object URL for audio element
4. Displays audio player with controls

## Development

### Prerequisites

- Node.js 16+ and npm
- Backend API running

### Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm start
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

### Environment Configuration

Update the API endpoint in `App.js`:
```javascript
const API_ENDPOINT = "https://your-api-gateway-url/prod/speak";
```

## Deployment

### AWS S3 + CloudFront

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Upload to S3**:
   ```bash
   aws s3 sync build/ s3://your-bucket-name --delete
   ```

3. **Invalidate CloudFront cache**:
   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
   ```

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Features in Detail

### Voice Selection

- **🇺🇸 English (US)**: Joanna (Female), Matthew (Male)
- **🇬🇧 English (UK)**: Amy (Female), Brian (Male)
- **🇫🇷 French**: Celine (Female)
- **🇩🇪 German**: Marlene (Female)
- **🇰🇷 Korean**: Seoyeon (Female)

### Language Processing

1. User enters English text
2. Selects target language
3. Backend translates text (if not English)
4. Frontend displays translation
5. Audio generated in target language

### Error Handling

- Network error handling
- Audio processing error handling
- User-friendly error messages
- Console logging for debugging

## Current Features

### UI Enhancements

- **Animated Background**: Subtle rotating spirals and flag patterns
- **Blue Theme**: Consistent blue color scheme throughout
- **Character Counter**: Real-time character count with 2500 limit
- **Flag Icons**: Country flags for easy language/voice identification

### Audio Features

- **Speed Control**: 0.25x, 0.5x, 1.0x, 1.5x, 2.0x playback speeds
- **Download**: Save generated audio as MP3 files
- **Share**: Native device sharing for audio files
- **SSML Support**: Enhanced voice synthesis with markup language

### Functionality

- **Translation Display**: Shows translated text before audio generation
- **Error Handling**: Comprehensive error handling and user feedback
- **Responsive Design**: Mobile-first approach with touch-friendly controls
- **Performance Optimized**: Efficient audio processing and state management

## Performance

- Optimized bundle size
- Lazy loading of audio data
- Efficient re-renders with React hooks
- Compressed assets in production build
