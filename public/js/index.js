window.onload = async () => {
    const torrentDiv = document.getElementById('torrents');
    const search = document.getElementById('search');
    const loadingDiv = document.getElementById('loading');

    let loading = false;
    let searchStatus = false;

    if (window.location.hash == '') {
        window.location.hash = '#1';
    }

    else {
        const hash = window.location.hash.split('#')[1];
        if (isNaN(hash)) {
            window.location.href = '/';
        }

        else {
            const number = parseInt(hash);
            for (let i = 0; i <= number; i++) {
                await LoadTorrents(i + 1);
                if (i == number) {
                    window.scrollTo(0, document.body.scrollHeight);
                }
            }
        }
    }

    search.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            if (search.value == '') {
                torrentDiv.innerHTML = '';
                searchStatus = false;
                await LoadTorrents(1);
                window.location.hash = '#1';
                return;
            }
            searchStatus = true;
            const query = encodeURIComponent(search.value);
            torrentDiv.innerHTML = '';
            loadingDiv.style.display = 'block';
            const searchRes = await fetch(`/api/torrents/search?search=${query}`).then(res => res.json());
            if (searchRes.torrents.length == 0) {
                loadingDiv.style.display = 'none';
                const div = document.createElement('div');
                div.classList.add('no-torrents');

                const p = document.createElement('p');
                p.innerText = "Ni torrentov";
                div.appendChild(p);
                torrentDiv.appendChild(div);
                return;
            }

            searchRes.torrents.forEach((torrent, index) => {
                const div = document.createElement('div');
                div.classList.add('torrent');

                const name = document.createElement('p');
                name.classList.add('torrent-name');
                name.innerText = torrent.name;

                const image = document.createElement('img');
                image.src = torrent.image;
                image.classList.add('torrent-image');
                const screenWidth = window.innerWidth;
                if (screenWidth <= 1920) {
                    image.width = 350;
                    image.height = 350;
                }
                else {
                    image.width = 500;
                    image.height = 500;
                }

                const type = document.createElement('div');
                type.classList.add('torrent-type-uploaded');

                const category = document.createElement('p');
                category.classList.add('torrent-category');
                category.innerText = "Tip torrenta: " + torrent.category;

                const uploaded = document.createElement('p');
                uploaded.classList.add('torrent-uploaded');
                uploaded.innerText = "Naloženo: " + torrent.uploaded;

                const info = document.createElement('div');
                info.classList.add('torrent-info');

                const size = document.createElement('p');
                size.classList.add('torrent-size');
                size.innerText = "Velikost torrenta: " + torrent.size;

                const seeders = document.createElement('p');
                seeders.classList.add('torrent-seeders');
                seeders.innerText = "Število sejalcev: " + torrent.seeders;

                const leechers = document.createElement('p');
                leechers.classList.add('torrent-leechers');
                leechers.innerText = "Število pijavk: " + torrent.leechers;

                const completed = document.createElement('p');
                completed.classList.add('torrent-completed');
                completed.innerText = "Število odjemalcev: " + torrent.completed;

                const link = document.createElement('button');
                link.classList.add('torrent-link');
                link.innerText = "Prenesi torrent";
                link.onclick = () => {
                    window.location.href = torrent.link;
                };

                div.appendChild(name);
                div.appendChild(image);
                type.appendChild(category);
                type.appendChild(uploaded);
                div.appendChild(type);
                div.appendChild(size);
                info.appendChild(seeders);
                info.appendChild(leechers);
                info.appendChild(completed);
                div.appendChild(info);
                div.appendChild(link);

                torrentDiv.appendChild(div);
            });

            loadingDiv.style.display = 'none';
        }
    });

    async function LoadTorrents(page) {
        if (searchStatus) return;
        const torrents = await fetch(`/api/torrents?page=${page}`).then(res => res.json());

        torrents.torrents.forEach((torrent, index) => {
            const div = document.createElement('div');
            div.classList.add('torrent');

            const name = document.createElement('p');
            name.classList.add('torrent-name');
            name.innerText = torrent.name;

            const image = document.createElement('img');
            image.src = torrent.image;
            image.classList.add('torrent-image');
            const screenWidth = window.innerWidth;
            if (screenWidth <= 1920) {
                image.width = 350;
                image.height = 350;
            }
            else {
                image.width = 500;
                image.height = 500;
            }

            const type = document.createElement('div');
            type.classList.add('torrent-type-uploaded');

            const category = document.createElement('p');
            category.classList.add('torrent-category');
            category.innerText = "Tip torrenta: " + torrent.category;

            const uploaded = document.createElement('p');
            uploaded.classList.add('torrent-uploaded');
            uploaded.innerText = "Naloženo: " + torrent.uploaded;

            const info = document.createElement('div');
            info.classList.add('torrent-info');

            const size = document.createElement('p');
            size.classList.add('torrent-size');
            size.innerText = "Velikost torrenta: " + torrent.size;

            const seeders = document.createElement('p');
            seeders.classList.add('torrent-seeders');
            seeders.innerText = "Število sejalcev: " + torrent.seeders;

            const leechers = document.createElement('p');
            leechers.classList.add('torrent-leechers');
            leechers.innerText = "Število pijavk: " + torrent.leechers;

            const completed = document.createElement('p');
            completed.classList.add('torrent-completed');
            completed.innerText = "Število odjemalcev: " + torrent.completed;

            const link = document.createElement('button');
            link.classList.add('torrent-link');
            link.innerText = "Prenesi torrent";
            link.onclick = () => {
                window.location.href = torrent.link;
            };

            div.appendChild(name);
            div.appendChild(image);
            type.appendChild(category);
            type.appendChild(uploaded);
            div.appendChild(type);
            div.appendChild(size);
            info.appendChild(seeders);
            info.appendChild(leechers);
            info.appendChild(completed);
            div.appendChild(info);
            div.appendChild(link);

            torrentDiv.appendChild(div);

            if (torrents.torrents.length - 1 == index) {
                loading = false;
                loadingDiv.style.display = 'none';
            }
        });
    }

    LoadTorrents(1);

    window.onscroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            if (loading) return;
            window.location.hash = `#${parseInt(window.location.hash.split('#')[1]) + 1}`;
            LoadTorrents(parseInt(window.location.hash.split('#')[1]));
            loading = true;
            loadingDiv.style.display = 'block';
            window.scrollTo(0, document.body.scrollHeight);
        }
    };
}