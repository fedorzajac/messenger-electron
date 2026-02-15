// ============================================
// MESSENGER APP PRE MAC
// Jednoduchá aplikácia ktorá otvára messenger.com
// ============================================

// Importujeme potrebné moduly z Electronu
const { app, BrowserWindow, shell } = require('electron');

// Premenná pre hlavné okno aplikácie
let mainWindow;

// ============================================
// FUNKCIA NA VYTVORENIE OKNA
// ============================================
function createWindow() {
  // Vytvoríme nové okno s nasledujúcimi nastaveniami
  mainWindow = new BrowserWindow({
    width: 1200,              // Šírka okna v pixeloch
    height: 800,              // Výška okna v pixeloch
    minWidth: 800,            // Minimálna šírka (aby to nevyzeralo zle)
    minHeight: 600,           // Minimálna výška
    title: 'Messenger',       // Názov v titulke
    
    // Webové nastavenia pre zabezpečenie a funkcionalitu
    webPreferences: {
      nodeIntegration: false,     // Bezpečnosť - nepovoľujeme Node.js v webe
      contextIsolation: true,     // Bezpečnosť - izolácia kontextu
      enableRemoteModule: false,  // Bezpečnosť - zakážeme remote modul
      webviewTag: false,          // Nepoužívame webview
      
      // Povolíme notifikácie z Messengeru
      notifications: true,
      
      // User agent string - necháme defaultný (Chrome)
      // Messenger funguje najlepšie s Chrome user agentom
    },
    
    // Vzhľad okna
    backgroundColor: '#0084ff',   // Messenger modrá farba pri načítavaní
    show: false,                   // Nezobrazíme okno kým sa nenačíta (aby neblikalo)
    autoHideMenuBar: true,        // Schovať menu bar automaticky (F10 ho zobrazí)
  });

  // Načítame Messenger web stránku
  mainWindow.loadURL('https://www.messenger.com');

  // ============================================
  // SPRACOVANIE ODKAZOV
  // ============================================
  // Keď používateľ klikne na odkaz, otvoríme ho v default prehliadači
  // (napr. YouTube linky, obrázky atď.)
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    // Ak odkaz začína http/https a NIE je messenger.com
    if (url.startsWith('http') && !url.includes('messenger.com') && !url.includes('facebook.com')) {
      shell.openExternal(url);  // Otvor v default prehliadači
      return { action: 'deny' }; // Neotváraj v aplikácii
    }
    // Messenger odkazy necháme v aplikácii
    return { action: 'allow' };
  });

  // Keď sa stránka načíta, zobrazíme okno (plynulý transition)
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // ============================================
  // NAVIGÁCIA - BEZPEČNOSŤ
  // ============================================
  // Zabezpečíme aby aplikácia nevedia ísť na zlé stránky
  mainWindow.webContents.on('will-navigate', (event, url) => {
    // Povolíme len messenger.com a facebook.com domény
    const allowedDomains = ['messenger.com', 'facebook.com', 'fbcdn.net'];
    const urlObj = new URL(url);
    
    // Ak nie je povolená doména, zablokujeme navigáciu
    if (!allowedDomains.some(domain => urlObj.hostname.includes(domain))) {
      event.preventDefault();
      // Otvoríme v default prehliadači namiesto toho
      shell.openExternal(url);
    }
  });

  // ============================================
  // NOTIFIKÁCIE
  // ============================================
  // Messenger web notifikácie by mali fungovať automaticky
  // Electron ich prepošle do macOS notifikačného centra
  
  // Keď sa okno zatvorí, vyčistíme premennú
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// ============================================
// LIFECYCLE APLIKÁCIE
// ============================================

// Keď je Electron pripravený, vytvoríme okno
app.whenReady().then(() => {
  createWindow();

  // Na macOS je bežné že aplikácie sa znovu aktivujú keď
  // používateľ klikne na ikonu v docku
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Keď sa zatvoria všetky okná, ukončíme aplikáciu
// (Okrem macOS, kde aplikácie bežia v pozadí)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// ============================================
// KONIEC
// ============================================
// To je všetko! Aplikácia načíta messenger.com,
// zvládne notifikácie a otvorí externé odkazy v prehliadači.
