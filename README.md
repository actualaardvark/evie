# Overview

This program is a way to organize to-do lists and tasks with the added accountability of messaging your friends (or people of your choice) on Discord whenever you begin or complete a task.

## Features

- Create, edit, and complete tasks
- Track time spent on each task
- Discord notifications for task creation and completion
- View completed tasks history
- Local storage persistence
- Keyboard shortcuts for quick actions

## Tech Stack

- **Frontend**: Next.js 15.5.2 (App Router), React 19
- **Styling**: Custom CSS with Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Discord Integration**: @discordjs/rest
- **Language**: TypeScript

## Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Discord bot with proper permissions

### Setup

1. **Clone the repository**
   ```bash
   gh repo clone apatheticbrick/evie
   cd evie
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DISCORD_BOT_TOKEN=your_bot_token_here
   CHANNEL=your_channel_id_here
   ```

   To get these values:
   - **Bot Token**: Create a bot at [Discord Developer Portal](https://discord.com/developers/applications)
   - **Channel ID**: Enable Developer Mode in Discord, right-click a channel → Copy ID

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Keyboard Shortcuts

- `Ctrl+N` - Create new task
- `Ctrl+Enter` - Save task (when modal is open)
- `Esc` - Close modal/cancel action
- `Enter` - Confirm dialog action

### Creating Tasks

1. Click "Add a New Task" or press `Ctrl+N`
2. Enter a title (required, max 100 characters)
3. Optionally add a description
4. Click "Save" or press `Ctrl+Enter`

### Managing Tasks

- **Edit**: Click anywhere on a task card
- **Complete**: Click the "Complete" button
- **View Completed**: Click the "Completed Tasks" header to expand/collapse
- **Uncomplete**: Click "Uncomplete" on a completed task

### Discord Notifications

The app automatically sends Discord messages when you:
- Create a new task
- Complete a task
- Uncomplete a task

## Project Structure

```
evie/
│   app/
│   ├── api/
│   │   └── sendMessage/
│   │       └── route.ts          # Discord API endpoint
│   ├── components/
│   │   └── taskcard.tsx          # Task card component
│   │   └── toast.tsx			  # Toasts
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main app component
│   ├── page.css                  # Component styles
│   └── globals.css               # Global styles
├── .env                              # Environment variables (not tracked)
├── next.config.ts                    # Next.js configuration
├── package.json                      # Dependencies
└── tsconfig.json                     # TypeScript configuration
```

## Data Storage

Tasks are stored in the browser's `localStorage` with two keys:
- `tasks` - Active tasks
- `completedTasks` - Completed tasks

**Note**: Data is stored locally and will be lost if you clear browser data.

## API Endpoints

### POST /api/sendMessage

Sends a message to the configured Discord channel.

**Request Body:**
```json
{
  "message": "Your message here"
}
```

**Response:**
```json
{
  "ok": true
}
```

**Error Responses:**
- `400` - Missing message body
- `500` - Server configuration error or Discord API error

## Development

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

### Linting

```bash
npm run lint
```

## Configuration

The app uses Next.js configuration to ignore TypeScript and ESLint errors during builds (see `next.config.ts`). This is useful for rapid development but should be addressed for production deployments.

## Troubleshooting

### Discord messages not sending

1. Verify your bot token is correct in `.env`
2. Ensure the bot has "Send Messages" permission in the channel
3. Check the bot is added to your server
4. Verify the channel ID is correct

### Tasks not persisting

- Ensure browser localStorage is enabled
- Check browser console for errors
- Try a different browser

## Known Bugs/limitations

- Some visual weirdness with the toast animation and formatting
- Data is stored locally (no cloud sync), meaning cross-platform is currently impossible
- No authentification
- Single Discord channel per deployment, different users can't send to different discord servers/channels, or one user can't choose which channel to send to
- Discord messages are hardcoded to include Evie's name which is probably bad.

## Future Enhancements

- Database integration for persistent storage
- User authentication and multi-user support
- Task categories and tags (?)
- Recurring tasks and reminders (?)
- Mobile support
- Task sharing and collaboration (?)

## License

idk do whatever u want with this ig