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

function getArrow(newVal, oldVal) {
    if (oldVal === undefined || newVal === '-' || oldVal === '-') return '';
    if (parseFloat(newVal) > parseFloat(oldVal)) {
        return '<img src="visuals/arrow_up.png" alt="▲" style="height:18px;vertical-align:-3px;margin-right:2px;">';
    } else if (parseFloat(newVal) < parseFloat(oldVal)) {
        return '<img src="visuals/arrow_down.png" alt="▼" style="height:18px;vertical-align:-3px;margin-right:2px;">';
    }
    return '';
}

async function updateMarquee() {
    try {
        const res = await fetch('/api/fiyatlar');
        const data = await res.json();

        // Prepare values and compare with previous
        const values = {
            dolar: data.dolar ?? '-',
            euro: data.euro ?? '-',
            sterlin: data.sterlin ?? '-',
            gramAltinTL: data.gramAltinTL ?? '-',
            ceyrekAltin: data.ceyrekAltinTL ?? '-', // Düzeltildi
            yarimAltin: data.yarimAltinTL ?? '-',   // Düzeltildi
            tamAltin: data.tamAltinTL ?? '-',       // Düzeltildi
            btcPrice: data.btcPrice ?? '-',
            ethPrice: data.ethPrice ?? '-'
        };

        const marquee = document.getElementById("exchangeMarquee");
        if (!marquee) return;

        marquee.innerHTML = `
            <span>
                <img src="${ICONS.dolar}" alt="Dolar" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${getArrow(values.dolar, previousValues.dolar)}
                Dolar: ${values.dolar}₺
            </span>
            <span>
                <img src="${ICONS.euro}" alt="Euro" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${getArrow(values.euro, previousValues.euro)}
                Euro: ${values.euro}₺
            </span>
            <span>
                <img src="${ICONS.sterlin}" alt="Sterlin" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${getArrow(values.sterlin, previousValues.sterlin)}
                Sterlin: ${values.sterlin}₺
            </span>
            <span>
                <img src="${ICONS.gramAltinTL}" alt="Gram Altın" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${getArrow(values.gramAltinTL, previousValues.gramAltinTL)}
                Gram Altın: ${values.gramAltinTL}₺
            </span>
            <span>
                <img src="${ICONS.ceyrekAltin}" alt="Çeyrek Altın" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${getArrow(values.ceyrekAltin, previousValues.ceyrekAltin)}
                Çeyrek Altın: ${values.ceyrekAltin}₺
            </span>
            <!--
            <span>
                <img src="${ICONS.yarimAltin}" alt="Yarım Altın" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${getArrow(values.yarimAltin, previousValues.yarimAltin)}
                Yarım Altın: ${values.yarimAltin}₺
            </span>
            <span>
                <img src="${ICONS.tamAltin}" alt="Tam Altın" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${getArrow(values.tamAltin, previousValues.tamAltin)}
                Tam Altın: ${values.tamAltin}₺
            </span>
            -->
            <span>
                <img src="${ICONS.btcPrice}" alt="BTC" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${getArrow(values.btcPrice, previousValues.btcPrice)}
                BTC: ${values.btcPrice}₺
            </span>
            <span>
                <img src="${ICONS.ethPrice}" alt="ETH" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${getArrow(values.ethPrice, previousValues.ethPrice)}
                ETH: ${values.ethPrice}₺
            </span>
            <span>
                <img src="${ICONS.dolar}" alt="Dolar" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${getArrow(values.dolar, previousValues.dolar)}
                Dolar: ${values.dolar}₺
            </span>
            <span>
                <img src="${ICONS.euro}" alt="Euro" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${getArrow(values.euro, previousValues.euro)}
                Euro: ${values.euro}₺
            </span>
            <span>
                <img src="${ICONS.sterlin}" alt="Sterlin" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${getArrow(values.sterlin, previousValues.sterlin)}
                Sterlin: ${values.sterlin}₺
            </span>
            <span>
                <img src="${ICONS.gramAltinTL}" alt="Gram Altın" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${getArrow(values.gramAltinTL, previousValues.gramAltinTL)}
                Gram Altın: ${values.gramAltinTL}₺
            </span>
            <span>
                <img src="${ICONS.ceyrekAltin}" alt="Çeyrek Altın" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${getArrow(values.ceyrekAltin, previousValues.ceyrekAltin)}
                Çeyrek Altın: ${values.ceyrekAltin}₺
            </span>
            <!--
            <span>
                <img src="${ICONS.yarimAltin}" alt="Yarım Altın" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${getArrow(values.yarimAltin, previousValues.yarimAltin)}
                Yarım Altın: ${values.yarimAltin}₺
            </span>
            <span>
                <img src="${ICONS.tamAltin}" alt="Tam Altın" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${getArrow(values.tamAltin, previousValues.tamAltin)}
                Tam Altın: ${values.tamAltin}₺
            </span>
            -->
            <span>
                <img src="${ICONS.btcPrice}" alt="BTC" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${getArrow(values.btcPrice, previousValues.btcPrice)}
                BTC: ${values.btcPrice}₺
            </span>
            <span>
                <img src="${ICONS.ethPrice}" alt="ETH" style="height:18px;vertical-align:-3px;margin-right:2px;">
                ${getArrow(values.ethPrice, previousValues.ethPrice)}
                ETH: ${values.ethPrice}₺
            </span>
        `;

        // Update previous values
        previousValues = { ...values };
    } catch (err) {
        const marquee = document.getElementById("exchangeMarquee");
        if (marquee) marquee.innerHTML = `<span>Veri alınamadı</span>`;
    }
}

updateMarquee();
setInterval(updateMarquee, 60000); // 1 dakikada bir güncelle
