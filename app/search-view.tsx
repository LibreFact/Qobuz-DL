"use client"

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useInView } from "react-intersection-observer";
import { useTheme } from 'next-themes';
import Script from 'next/script';
import SearchBar from '@/components/search-bar';
import ReleaseCard from '@/components/release-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { Disc3Icon, DiscAlbumIcon } from 'lucide-react';
import { filterExplicit, QobuzAlbum, QobuzSearchResults, QobuzTrack } from '@/lib/qobuz-dl';
import { getTailwindBreakpoint } from '@/lib/utils';
import { useSettings } from '@/lib/settings-provider';
import Image from 'next/image';
import { motion, useAnimation } from 'motion/react';

const SearchView = () => {
    const { resolvedTheme } = useTheme();
    const [results, setResults] = useState<QobuzSearchResults | null>(null);
    const [searchField, setSearchField] = useState<"albums" | "tracks">('albums');
    const [query, setQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(false);
    const [searchError, setSearchError] = useState<string>('');
    const { settings } = useSettings();

    const filterData = [
        {
            label: "Albums",
            value: 'albums',
            icon: DiscAlbumIcon
        },
        {
            label: "Tracks",
            value: 'tracks',
            icon: Disc3Icon
        }
    ]
    const FilterIcon = filterData.find((fd) => fd.value == searchField)?.icon || Disc3Icon;

    const [scrollTrigger, isInView] = useInView();

    const fetchMore = () => {
        if (loading) return;
        setLoading(true);
        axios.get(`/api/get-music?q=${query}&offset=${results![searchField].items.length}`)
            .then((response) => {
                if (response.status === 200) {
                    let newResults = { ...results!, [searchField]: { ...results!.albums, items: [...results!.albums.items, ...response.data.data.albums.items] } }
                    filterData.map((filter) => {
                        newResults = { ...newResults, [filter.value]: { ...results![filter.value as "albums" | "tracks"], items: [...results![filter.value as "albums" | "tracks"].items, ...response.data.data[filter.value].items] } }
                    })
                    setLoading(false);
                    if (query === response.data.data.query) setResults(newResults);
                }
            });
    }

    useEffect(() => {
        if (results === null) return;

        if (searching) return;

        if (results![searchField].total > results![searchField].items.length) {
            fetchMore();
        }
    }, [searchField])

    useEffect(() => {
        if (searching) return;
        if (isInView && results![searchField].total > results![searchField].items.length && !loading) fetchMore();
    }, [isInView, results]);

    return (
        <>
            <div className="space-y-4">
                <SearchBar
                    onSearch={async (query: string, searchFieldInput: string = searchField) => {
                        setQuery(query);
                        setSearchError('');
                        try {
                            const response = await axios.get(`/api/get-music?q=${query}&offset=0`);
                            if (response.status === 200) {
                                setLoading(false);
                                if (searchField !== searchFieldInput) setSearchField(searchFieldInput as "albums" | "tracks");
                                setResults(response.data.data);
                            }
                        } catch (error: any) {
                            setSearchError(error?.response.data?.error || error.message || 'An error occurred.');
                        }
                        setSearching(false);
                    }}
                    searching={searching}
                    setSearching={setSearching}
                    query={query}
                />
            </div>
            
            {searchError && <p className="text-destructive w-full text-center font-semibold">{searchError}</p>}
            
            <Script
                strategy="lazyOnload"
                data-cfasync="false"
                src="//pl26017529.effectiveratecpm.com/9892ffd32f9cb817e6496cb53572d152/invoke.js"
            />
            <div id="container-9892ffd32f9cb817e6496cb53572d152"></div>
        </>
    )
}

export default SearchView;
