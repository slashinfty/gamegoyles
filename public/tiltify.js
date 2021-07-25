const tiltifyClient = new TiltifyClient(process.env.TILTIFY_TOKEN);

const printMoney = amount => {
    let text = '$' + amount;
	if (/\.\d$/.test(text)) text += '0';
	else if (!/\./.test(text)) text += '.00';
	return text;
}

const getDonationTotal = async () => await tiltifyClient.Campaigns.get(process.env.TILTIFY_CAMPAIGN, data => document.getElementById('donation-total').innerText = printMoney(data.amountRaised));

getDonationTotal();
setInterval(getDonationTotal, 30000);