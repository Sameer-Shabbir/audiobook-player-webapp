import {
	Play,
	Pause,
	SkipBack,
	SkipForward,
	RotateCcw,
	RotateCw,
	BookOpen,
	ChevronUp,
	ChevronDown,
	X,
	Loader2,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import type { Book, Section } from "@/lib/types";
import { getAuthorName, getCoverUrl } from "@/lib/types";
import type { AudioPlayer } from "@/hooks/useAudioPlayer";
import { Waveform } from "./Waveform";
import { fadeIn, scaleIn, slideUp, slideUpMini, fadeSlideUp } from "@/lib/animations";

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] as const;

interface PlayerProps {
	book: Book;
	currentSection: Section;
	currentSectionIndex: number;
	audio: AudioPlayer;
	onPrevSection: () => void;
	onNextSection: () => void;
	onClose: () => void;
}

function formatTime(seconds: number): string {
	if (!seconds || !Number.isFinite(seconds)) return "0:00";
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function SpeedSelector({
	value,
	onChange,
}: {
	value: number;
	onChange: (rate: number) => void;
}) {
	return (
		<div className="flex items-center gap-1.5">
			{SPEED_OPTIONS.map((rate) => (
				<button
					key={rate}
					type="button"
					onClick={() => onChange(rate)}
					className={`rounded-full border border-border px-2.5 py-1 text-xs transition-colors ${
						value === rate
							? "bg-primary text-primary-foreground"
							: "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
					}`}
				>
					{rate}x
				</button>
			))}
		</div>
	);
}

export function Player({
	book,
	currentSection,
	currentSectionIndex,
	audio,
	onPrevSection,
	onNextSection,
	onClose,
}: PlayerProps) {
	const [expanded, setExpanded] = useState(true);
	const coverUrl = getCoverUrl(book);
	const authorName = getAuthorName(book);
	const totalSections = book.sections.length;

	if (expanded) {
		return (
			<motion.div
				{...slideUp}
				className="fixed inset-0 z-50 flex flex-col bg-linear-to-b from-purple-300 via-violet-50 to-background"
			>
				<div className="flex items-center justify-between px-4 pt-4">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setExpanded(false)}
						className="size-9"
					>
						<ChevronDown className="size-5" />
					</Button>
					<img
						src="/logo-transparent.png"
						alt="Now Playing"
						className="h-18 object-contain"
					/>
					<Button
						variant="ghost"
						size="icon"
						onClick={onClose}
						className="size-9"
					>
						<X className="size-5" />
					</Button>
				</div>

				<div className="flex flex-1 flex-col items-center justify-center gap-8 px-6">
					<motion.div
						{...scaleIn}
						className="size-64 shrink-0 overflow-hidden rounded-2xl bg-muted shadow-xl shadow-purple-200/50 lg:size-72"
					>
						{coverUrl ? (
							<img
								src={coverUrl}
								alt={book.title}
								className="size-full object-cover"
							/>
						) : (
							<div className="flex size-full items-center justify-center">
								<BookOpen className="size-16 text-muted-foreground/30" />
							</div>
						)}
					</motion.div>

					<Waveform
						isPlaying={audio.isPlaying}
						barCount={56}
						className="h-14 w-full max-w-md"
					/>

					<motion.div {...fadeSlideUp} className="w-full max-w-md space-y-1.5 text-center">
						<p className="text-xl text-foreground">{book.title}</p>
						<p className="text-base text-muted-foreground">{authorName}</p>
						<p className="text-sm text-muted-foreground/60">
							{currentSection.title} ({currentSectionIndex + 1} of{" "}
							{totalSections})
						</p>
					</motion.div>

					<div className="w-full max-w-md space-y-2">
						<Slider
							value={[audio.currentTime]}
							min={0}
							max={audio.duration || 100}
							step={1}
							onValueChange={([val]) => audio.seek(val)}
						/>
						<div className="flex justify-between text-sm text-muted-foreground">
							<span>{formatTime(audio.currentTime)}</span>
							<span>{formatTime(audio.duration)}</span>
						</div>
					</div>

					<div className="flex items-center gap-5">
						<Button
							variant="ghost"
							size="icon"
							onClick={onPrevSection}
							disabled={currentSectionIndex === 0}
							className="size-12"
						>
							<SkipBack className="size-6" />
						</Button>
						<button
							type="button"
							onClick={() => audio.seek(Math.max(0, audio.currentTime - 10))}
							className="relative flex size-12 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-white/50 hover:text-foreground"
						>
							<RotateCcw className="size-6" />
							<span className="absolute text-[10px]">10</span>
						</button>
						<Button
							onClick={audio.togglePlayback}
							size="icon"
							className="size-18 rounded-full"
						>
							{audio.isLoading ? (
								<Loader2 className="size-8 animate-spin" />
							) : audio.isPlaying ? (
								<Pause className="size-8" />
							) : (
								<Play className="size-8 translate-x-0.5" />
							)}
						</Button>
						<button
							type="button"
							onClick={() =>
								audio.seek(Math.min(audio.duration, audio.currentTime + 10))
							}
							className="relative flex size-12 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-white/50 hover:text-foreground"
						>
							<RotateCw className="size-6" />
							<span className="absolute text-[10px]">10</span>
						</button>
						<Button
							variant="ghost"
							size="icon"
							onClick={onNextSection}
							disabled={currentSectionIndex >= totalSections - 1}
							className="size-12"
						>
							<SkipForward className="size-6" />
						</Button>
					</div>

					<SpeedSelector
						value={audio.playbackRate}
						onChange={audio.setPlaybackRate}
					/>
				</div>
			</motion.div>
		);
	}

	return (
		<motion.div
			{...slideUpMini}
			className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/80 backdrop-blur-xl"
		>
			<div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
				<button
					type="button"
					onClick={() => setExpanded(true)}
					className="flex min-w-0 flex-1 items-center gap-3"
				>
					<div className="size-11 shrink-0 overflow-hidden rounded-lg bg-muted">
						{coverUrl ? (
							<img
								src={coverUrl}
								alt={book.title}
								className="size-full object-cover"
							/>
						) : (
							<div className="flex size-full items-center justify-center">
								<BookOpen className="size-5 text-muted-foreground/40" />
							</div>
						)}
					</div>

					<div className="min-w-0 flex-1 text-left">
						<p className="truncate text-sm text-foreground">{book.title}</p>
						<p className="truncate text-xs text-muted-foreground">
							{currentSection.title}
						</p>
					</div>

					<ChevronUp className="size-4 shrink-0 text-muted-foreground" />
				</button>

				<div className="flex items-center gap-0.5">
					<button
						type="button"
						onClick={() => audio.seek(Math.max(0, audio.currentTime - 10))}
						className="relative flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
					>
						<RotateCcw className="size-3.5" />
						<span className="absolute text-[7px]">10</span>
					</button>
					<Button
						variant="ghost"
						size="icon"
						onClick={onPrevSection}
						disabled={currentSectionIndex === 0}
						className="size-8"
					>
						<SkipBack className="size-4" />
					</Button>
					<Button
						onClick={audio.togglePlayback}
						size="icon"
						className="size-9 rounded-full"
					>
						{audio.isLoading ? (
							<Loader2 className="size-4 animate-spin" />
						) : audio.isPlaying ? (
							<Pause className="size-4" />
						) : (
							<Play className="size-4 translate-x-px" />
						)}
					</Button>
					<Button
						variant="ghost"
						size="icon"
						onClick={onNextSection}
						disabled={currentSectionIndex >= totalSections - 1}
						className="size-8"
					>
						<SkipForward className="size-4" />
					</Button>
					<button
						type="button"
						onClick={() =>
							audio.seek(Math.min(audio.duration, audio.currentTime + 10))
						}
						className="relative flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
					>
						<RotateCw className="size-3.5" />
						<span className="absolute text-[7px]">10</span>
					</button>
				</div>
			</div>

			<div className="px-4 pb-4">
				<Slider
					value={[audio.currentTime]}
					min={0}
					max={audio.duration || 100}
					step={1}
					onValueChange={([val]) => audio.seek(val)}
				/>
			</div>
		</motion.div>
	);
}
