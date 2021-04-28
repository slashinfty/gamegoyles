const tiltifyClient = new TiltifyClient(process.env.TILTIFY_TOKEN);

const getDonationTotal = async () => {
    await tiltifyClient.Campaigns.get(process.env.TILTIFY_CAMPAIGN, data => {
        document.getElementById('donation-total').innerText = '$' + data.amountRaised;
        fs.writeFileSync(donation, '$' + data.amountRaised);
    });
}

setInterval(getDonationTotal, 30000);