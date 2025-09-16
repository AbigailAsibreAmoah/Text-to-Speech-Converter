# Text-to-Speech Frontend

A modern React application for converting text to speech with multi-language support and translation capabilities.

## Features

- 🎨 **Modern UI**: Clean, responsive design with gradient backgrounds
- 📝 **Text Input**: Large textarea for text entry
- 🎭 **Voice Selection**: Multiple voice options per language
- 🌍 **Language Support**: English, French, German, Korean
- 🔄 **Real-time Translation**: Shows translated text before speech generation
- 🎵 **Audio Playback**: Built-in audio player with controls
- 📱 **Mobile Responsive**: Works on all device sizes

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
  body: JSON.stringify({ text, voice, language })
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

- **English**: Joanna (Female), Matthew (Male), Amy (British Female), Brian (British Male)
- **French**: Celine (Female)
- **German**: Marlene (Female)
- **Korean**: Seoyeon (Female)

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

## Customization

### Styling

Modify `App.css` to customize:
- Color scheme
- Typography
- Layout
- Animations

### Functionality

Extend `App.js` to add:
- More languages
- Additional voice options
- Audio download feature
- Text-to-speech history

## Performance

- Optimized bundle size
- Lazy loading of audio data
- Efficient re-renders with React hooks
- Compressed assets in production build