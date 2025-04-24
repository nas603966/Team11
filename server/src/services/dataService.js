const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

// Ensure data directory exists
const ensureDataDir = async () => {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
};

// Initialize data files if they don't exist
const initializeDataFiles = async () => {
  await ensureDataDir();
  
  const files = {
    'tickets.json': [],
    'users.json': [],
    'admins.json': []
  };

  for (const [filename, defaultData] of Object.entries(files)) {
    const filePath = path.join(DATA_DIR, filename);
    try {
      await fs.access(filePath);
    } catch {
      await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2));
    }
  }
};

// Generic read function
const readData = async (filename) => {
  const filePath = path.join(DATA_DIR, filename);
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
};

// Generic write function
const writeData = async (filename, data) => {
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

// Ticket operations
const ticketService = {
  getAll: async () => {
    return await readData('tickets.json');
  },

  getById: async (id) => {
    const tickets = await readData('tickets.json');
    return tickets.find(ticket => ticket._id === id);
  },

  create: async (ticketData) => {
    const tickets = await readData('tickets.json');
    const newTicket = {
      _id: Date.now().toString(),
      ...ticketData,
      createdAt: new Date().toISOString()
    };
    tickets.push(newTicket);
    await writeData('tickets.json', tickets);
    return newTicket;
  },

  update: async (id, updateData) => {
    const tickets = await readData('tickets.json');
    const index = tickets.findIndex(ticket => ticket._id === id);
    if (index === -1) return null;
    
    tickets[index] = { ...tickets[index], ...updateData };
    await writeData('tickets.json', tickets);
    return tickets[index];
  },

  delete: async (id) => {
    const tickets = await readData('tickets.json');
    const filteredTickets = tickets.filter(ticket => ticket._id !== id);
    await writeData('tickets.json', filteredTickets);
    return true;
  }
};

// User operations
const userService = {
  getAll: async () => {
    return await readData('users.json');
  },

  getById: async (id) => {
    const users = await readData('users.json');
    return users.find(user => user._id === id);
  },

  create: async (userData) => {
    const users = await readData('users.json');
    const newUser = {
      _id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    await writeData('users.json', users);
    return newUser;
  },

  update: async (id, updateData) => {
    const users = await readData('users.json');
    const index = users.findIndex(user => user._id === id);
    if (index === -1) return null;
    
    users[index] = { ...users[index], ...updateData };
    await writeData('users.json', users);
    return users[index];
  }
};

// Admin operations
const adminService = {
  validateCredentials: async (username, password) => {
    const admins = await readData('admins.json');
    return admins.find(admin => 
      admin.username === username && 
      admin.password === password
    );
  }
};

// Initialize data files when the service is imported
initializeDataFiles().catch(console.error);

module.exports = {
  ticketService,
  userService,
  adminService
}; 