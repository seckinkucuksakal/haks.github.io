// Icon paths
const ICONS = {
    dolar: 'visuals/dolar_currency.png',
    euro: 'visuals/euro_currency.png',
    sterlin: 'visuals/gbp_currency.png',
    gramAltinTL: 'visuals/gold_symbol.png',
    ceyrekAltin: 'visuals/gold_symbol.png',
    yarimAltin: 'visuals/gold_symbol.png',
    tamAltin: 'visuals/gold_symbol.png',
    btcPrice: 'visuals/bitcoin_symbol.png',
    ethPrice: 'visuals/etherum_symbol.png'
};

// Previous values for comparison
let previousValues = {};

async function updateMarquee() {
    try {
        const res = await fetch('/api/fiyatlar');
        const data = await res.json();

        // Prepare values (arrowlar artık data.arrows'tan geliyor)
        const values = {
            dolar: data.dolar ?? '-',
            euro: data.euro ?? '-',
            sterlin: data.sterlin ?? '-',
            gramAltinTL: data.gramAltinTL ?? '-',
            ceyrekAltin: data.ceyrekAltinTL ?? '-',
            yarimAltin: data.yarimAltinTL ?? '-',
            tamAltin: data.tamAltinTL ?? '-',
            btcPrice: data.btcPrice ?? '-',
            ethPrice: data.ethPrice ?? '-'
        };
        const arrows = data.arrows || {};

        const arrowIcon = (type) => {
            if (arrows[type] === 'up') return '<img src="visuals/arrow_up.png" alt="▲" style="height:18px;vertical-align:-3px;margin-right:2px;">';
            if (arrows[type] === 'down') return '<img src="visuals/arrow_down.png" alt="▼" style="height:18px;vertical-align:-3px;margin-right:2px;">';
            return '';
        };

        const marquee = document.getElementById("exchangeMarquee");
        if (!marquee) return;

        marquee.innerHTML = `
            <span>
                <img src="${ICONS.dolar}" alt="Dolar" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${arrowIcon('dolar')}
                Dolar: ${values.dolar}₺
            </span>
            <span>
                <img src="${ICONS.euro}" alt="Euro" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${arrowIcon('euro')}
                Euro: ${values.euro}₺
            </span>
            <span>
                <img src="${ICONS.sterlin}" alt="Sterlin" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${arrowIcon('sterlin')}
                Sterlin: ${values.sterlin}₺
            </span>
            <span>
                <img src="${ICONS.gramAltinTL}" alt="Gram Altın" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${arrowIcon('gramAltinTL')}
                Gram Altın: ${values.gramAltinTL}₺
            </span>
            <span>
                <img src="${ICONS.ceyrekAltin}" alt="Çeyrek Altın" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${arrowIcon('ceyrekAltinTL')}
                Çeyrek Altın: ${values.ceyrekAltin}₺
            </span>
            <span>
                <img src="${ICONS.btcPrice}" alt="BTC" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${arrowIcon('btcPrice')}
                BTC: ${values.btcPrice}₺
            </span>
            <span>
                <img src="${ICONS.ethPrice}" alt="ETH" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${arrowIcon('ethPrice')}
                ETH: ${values.ethPrice}₺
            </span>
            <span>
                <img src="${ICONS.dolar}" alt="Dolar" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${arrowIcon('dolar')}
                Dolar: ${values.dolar}₺
            </span>
            <span>
                <img src="${ICONS.euro}" alt="Euro" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${arrowIcon('euro')}
                Euro: ${values.euro}₺
            </span>
            <span>
                <img src="${ICONS.sterlin}" alt="Sterlin" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${arrowIcon('sterlin')}
                Sterlin: ${values.sterlin}₺
            </span>
            <span>
                <img src="${ICONS.gramAltinTL}" alt="Gram Altın" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${arrowIcon('gramAltinTL')}
                Gram Altın: ${values.gramAltinTL}₺
            </span>
            <span>
                <img src="${ICONS.ceyrekAltin}" alt="Çeyrek Altın" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${arrowIcon('ceyrekAltinTL')}
                Çeyrek Altın: ${values.ceyrekAltin}₺
            </span>
            <span>
                <img src="${ICONS.btcPrice}" alt="BTC" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${arrowIcon('btcPrice')}
                BTC: ${values.btcPrice}₺
            </span>
            <span>
                <img src="${ICONS.ethPrice}" alt="ETH" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${arrowIcon('ethPrice')}
                ETH: ${values.ethPrice}₺
            </span>
        `;
    } catch (err) {
        const marquee = document.getElementById("exchangeMarquee");
        if (marquee) marquee.innerHTML = `<span>Veri alınamadı</span>`;
    }
}

updateMarquee();
setInterval(updateMarquee, 60000); // 1 dakikada bir güncelle
