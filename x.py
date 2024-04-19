from quart import Quart, jsonify, request
from pyppeteer import launch
import re
import asyncio

from time import time

app = Quart(__name__)

custom_channel_names = [
    "SiegedSecurity",
    "HacktivistIndonesia",
    "HacktivistPakistan",
    "ganosecteam",
    "BreachedDiscussion1",  # (chat/discussion)
    "AnonymousCyberWarriors",  # (chat/discussion)
    "MysteriousTeam0",
    "Team_insane_Pakistan",  # (less trusted)
    "shadowleakss",
    "SilentForceMTB",
    "eaglecyberwashere",
    "BLOODYSECC",
    "fckindia",
    "GrabSmtpNow",
    "DataRecordsShop",
    "DataBreachPremium",
    "revolusigbanon17",
    "IRoX_Team",
    "GHOSTPalestine",
    "AccountSquadChat",
    "Team_r70YEMEN",
    "GhostSecc",
    "hackingtoolsprvi8",
    # "+I-FfbhSk3ug2MmZl",
    # "dailydarkweb",  # (without source, image)
    "leaksploit",
    "goblins_gang",
    "leakbase_official",
    "DarkStormTeams",
]
browser_instance = None
path = "/usr/bin/chromium"


async def get_browser():
    global browser_instance
    if browser_instance is None:
        browser_instance = await launch(
            executablePath=path, options={"args": ["--no-sandbox"]}
        )
    return browser_instance


async def scrape_links(search_query, num_pages=2):
    start_time = time()
    browser = await get_browser()

    async def scrape_page(page_num):
        page = await browser.newPage()
        s_url = f"https://cse.google.com/cse?&cx=006368593537057042503:efxu7xprihg#gsc.tab=0&gsc.q={search_query}&gsc.sort=date&gsc.page={page_num}"
        print(s_url)
        await page.goto(s_url, {"waitUntil": "networkidle0"})
        scraped_links = await page.evaluate(
            """() => {
                const anchorNodes = document.querySelectorAll('a');
                const linksArray = Array.from(anchorNodes);
                const nonEmptyLinks = linksArray
                    .filter(link => link.href && link.href.trim() !== '' && !link.href.startsWith('javascript:void(0)'))
                    .map(link => link.href);

                return nonEmptyLinks;
            }"""
        )
        await page.close()
        return scraped_links

    tasks = [scrape_page(page_num) for page_num in range(1, num_pages + 1)]
    all_links = await asyncio.gather(*tasks)

    # Flatten the list of lists into a single list
    scraped_links = [link for sublist in all_links for link in sublist]

    print(f"Time taken: {time() - start_time} seconds")
    print("this are", scraped_links[1:-2])
    return scraped_links[1:-2]


@app.route("/")
async def home():
    return jsonify("HELLO")


@app.route("/api/scrape-channels")
async def api_scrape_links():
    try:
        search_query = request.args.get("q", "python")

        # Create the first modified search query
        modified_query1 = f'"{search_query}" AND "database" "leak" -telegraph'

        # Create the second modified search query
        modified_query2 = f'"{search_query}" AND ("database leak" OR "data breach") AND ("hack" OR "database" OR "leak") -telegraph -news'

        print(modified_query1, "\n", modified_query2)

        # Use asyncio.gather to run both queries concurrently
        results1 = await asyncio.gather(
            scrape_links(modified_query1), scrape_links(modified_query2)
        )

        # Merge the results from both queries into a single list
        all_links = []
        for results in results1:
            all_links.extend(results)

        # Extract channel names from tgstat links
        tgstat_channel_names = [
            match.group(1)
            for url in all_links
            if "tgstat.com" in url and (match := re.search(r"@([^/]+)", url))
        ]

        print("TGSTAT CHANNEL NAMES:", tgstat_channel_names)
        # Extract channel names from other links (telemetr.io)
        telemetr_channel_names = [
            match.group(1)
            for url in all_links
            if "telemetr.io" in url
            and (match := re.search(r"telemetr.io/\w+/channels/\d+-(\w+)", url))
        ]
        print("TELEMETR CHANNEL NAMES:", telemetr_channel_names)
        # Extract channel names from other links
        pattern = re.compile(r"https?://(t\.me|telegram\.me)/s/([^/?]+)(?:\?[^/]+)?$")
        telegram_channel_names = [
            match.group(2) for url in all_links if (match := pattern.search(url))
        ]

        # Combine channel names from both sources
        channel_names = (
            tgstat_channel_names
            + telegram_channel_names
            + custom_channel_names
            + telemetr_channel_names
        )
        channel_names = [name for name in channel_names if name]

        unique_channel_names = list(dict.fromkeys(channel_names))
        print(unique_channel_names)
        return jsonify(unique_channel_names)
    except Exception as e:
        print(e)
        return jsonify({"error": "Internal Server Error links"}), 500
