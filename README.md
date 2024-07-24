# Zeta Charity
 
<img src="https://i.ibb.co/ZN8wt8X/logoW.png" >

<p>

Zeta Charity is a Zeta Chain and BTC based decentralized streaming platform where creators can create charity-based streams for social, environmental and economic causes.

# Watch our demo video:

[![Demo](https://i.ibb.co/j3DCtPZ/image.png)](Pending...)

# Test the product:

## URL: https://zeta-charity.vercel.app/

## Requirements

- Use Zeta Chain Mainnet on Metamask Wallet!
  - Get it on Metamask: https://metamask.io/
  - https://www.zetachain.com/docs/users/zetahub/create-wallet/

# Diagram:

<img src="https://i.ibb.co/Nm2Bp86/Untitled-Diagram-drawio.png" >

## Tech we Use:

- Zeta Chain Network:
  - BTC and ZETA Donations.
- Livepeer:
  - RTMP URL:
    - Url to easily transmit from the OBS and start our transmission.
  - Livestreams and Recordings API:
    - Obtaining the url if a streamer is live.
    - Obtaining the last record of each streamer if he is offline.

# How it's built:

## Zeta Chain Network:

<img src="https://i.ibb.co/4PSK1DJ/image.png" width="300px">

ZETA management and ZRC20 Tokens (BTC). This in order to be able to receive and send tokens from any Chain in the Zeta Chain ecosystem.

<img src="https://i.ibb.co/bzzv0n2/image.png" >

In order to obtain the balances of each of the ZRC20 Tokens in the Zeta Chain network, the ZCR20 interface of the following contract was used, this is the standard ZRC20 contract for any EVM, all controlled by the library [Ethers.js](https://docs.ethers.org/v5/).

    const ethersProvider = new providers.Web3Provider(walletProvider);
    const zrc20Contract = new Contract(
      "0x13A0c5930C028511Dc02665E7285134B6d11A5f4",
      abiZRC20,
      ethersProvider
    );
    const signer = await ethersProvider.getSigner();
    const address = await signer.getAddress();
    const [balance, balanceCharity, balanceBTC, balanceBTCCharity] =
      await Promise.all([
        signer.getBalance(),
        ethersProvider.getBalance(streamer.publicKey),
        zrc20Contract.balanceOf(address),
        zrc20Contract.balanceOf(streamer.publicKey),
      ]);
    setBalance(balance);
    setBalanceCharity(balanceCharity);
    setBalanceBTC(balanceBTC);
    setBalanceBTCCharity(balanceBTCCharity);

[Complete Code](./zeta-charity-nextjs/src/app/streamer/[streamer]/page.js)

Within our platform we have a summary where we can see all the donations in real time.

<img src="https://i.ibb.co/jyCy1Vs/image.png">

## Livepeer:

<img src="https://i.ibb.co/pf527Tc/image.png">

All the streaming services were done through Livepeer.

<img src="https://i.ibb.co/KjqqmSm/Untitled-Diagram3-drawio.png">

To manage Streamers, the profiles of each of the Streamers were created within the Livepeer dashboard, with which we were able to provide each Streamer with their keys to perform their Streams.

<img src="https://i.ibb.co/5hq2C1C/Screenshot-2024-07-23-183857.png">

Thanks to the Livepeer APIs it was possible for us to obtain if the Streamers were doing a Live, thanks to this the viewers could always be aware when a live stream is made.

<img src="https://i.ibb.co/tXVMYQk/Screenshot-2024-07-23-183924.png">

The section of code that allows us to obtain the profiles, recordings and states (live or offline) is the following.

Code Snippet:

    "use server";
    import { Livepeer } from "livepeer";

    const livepeer = new Livepeer({
        apiKey: process.env.LIVEPEER_APIKEY,
    });

    export async function getStreams() {
        const result = await livepeer.stream.getAll("<value>");
        let json = {};
        result.data.forEach((streamer) => {
            json[streamer.id] = streamer.isActive;
        });
        return json;
    }

[Complete Code](./zeta-charity-nextjs/src/api/getPlaybackInfo.js)

# References

https://www.twitch.tv/creatorcamp/en/connect-and-engage/charity-streaming/

https://www.donordrive.com/charity-streaming/

https://www.youtube.com/watch?v=Hh4T4RuK1H8
