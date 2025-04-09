'use client'

import { cn } from '@shared/lib/utils/cn'
import * as React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'

const Drawer = ({
	shouldScaleBackground = true,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
	<DrawerPrimitive.Root
		noBodyStyles
		shouldScaleBackground={shouldScaleBackground}
		{...props}
	/>
)
Drawer.displayName = 'Drawer'

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
	React.ElementRef<typeof DrawerPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<DrawerPrimitive.Overlay
		ref={ref}
		className={cn('fixed inset-0 z-50 bg-[#181A1E]/95', className)}
		{...props}
	/>
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
	React.ElementRef<typeof DrawerPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<DrawerPortal>
		<DrawerOverlay />
		<DrawerPrimitive.Content
			ref={ref}
			className={cn(
				'fixed inset-x-4 bottom-4 z-50 p-[18px] pt-0 mt-24 flex h-auto flex-col rounded-32 border border-[#282B30] bg-gradient-to-b from-[65%] to-[289%] from-[#1D2025] to-primary-foreground after:opacity-0',
				className,
			)}
			{...props}
		>
			<div className="mx-auto mt-3 h-1.5 w-9 rounded-full bg-[#3F4145]" />
			{children}
		</DrawerPrimitive.Content>
	</DrawerPortal>
))
DrawerContent.displayName = 'DrawerContent'

const DrawerHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn('grid gap-1.5 py-[22px] text-center', className)}
		{...props}
	/>
)
DrawerHeader.displayName = 'DrawerHeader'

const DrawerFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn('mt-auto flex flex-col gap-2 p-4', className)}
		{...props}
	/>
)
DrawerFooter.displayName = 'DrawerFooter'

const DrawerTitle = React.forwardRef<
	React.ElementRef<typeof DrawerPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
	<DrawerPrimitive.Title
		ref={ref}
		className={cn(
			'text-[22px] font-bold leading-none tracking-tight',
			className,
		)}
		{...props}
	/>
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
	React.ElementRef<typeof DrawerPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
	<DrawerPrimitive.Description
		ref={ref}
		className={cn('text-sm opacity-50 font-bold max-w-60 mx-auto', className)}
		{...props}
	/>
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
	Drawer,
	DrawerPortal,
	DrawerOverlay,
	DrawerTrigger,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerFooter,
	DrawerTitle,
	DrawerDescription,
}
