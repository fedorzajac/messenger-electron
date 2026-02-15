#!/bin/bash
# ============================================
# JEDNODUCHÝ BUILD SKRIPT
# Spusti: ./build.sh
# ============================================

echo "🚀 Začínam build Messenger aplikácie..."
echo ""

# Kontrola či existuje node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 Prvýkrát - inštalujem závislosti..."
    echo "   (Toto potrvá pár minút)"
    npm install
    echo ""
fi

echo "🔨 Kompilujem aplikáciu..."
npm run build

echo ""
echo "✅ HOTOVO!"
echo ""
echo "Aplikácia je v zložke: dist/Messenger.app"
echo "Inštalátor je v zložke: dist/Messenger-1.0.0.dmg"
echo ""
echo "Môžeš ju teraz spustiť alebo presunúť do /Applications"
