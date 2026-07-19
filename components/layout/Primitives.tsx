import * as React from 'react'
import { cn } from '@/lib/utils'

// Container Component - clamps max-width with centered fluid padding
export function Container({
  className,
  as: Component = 'div',
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  as?: React.ElementType
}) {
  return (
    <Component
      className={cn(
        'mx-auto w-full max-w-(--container-max-width) px-4 sm:px-6 lg:px-8',
        className
      )}
      {...props}
    />
  )
}

// Grid Component - helps generate responsive layouts
export function Grid({
  className,
  cols = 'default',
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  cols?: 'default' | 1 | 2 | 3 | 4 | 'sm-2' | 'md-3' | 'lg-4'
}) {
  const colClasses = {
    default: 'grid grid-cols-1 gap-6',
    1: 'grid grid-cols-1 gap-6',
    2: 'grid grid-cols-1 gap-6 sm:grid-cols-2',
    3: 'grid grid-cols-1 gap-6 md:grid-cols-3',
    4: 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4',
    'sm-2': 'grid grid-cols-1 gap-6 sm:grid-cols-2',
    'md-3': 'grid grid-cols-1 gap-6 md:grid-cols-3',
    'lg-4': 'grid grid-cols-1 gap-6 lg:grid-cols-4',
  }

  return <div className={cn(colClasses[cols], className)} {...props} />
}

// Stack Component - handles fluid vertical or horizontal spacing alignment
export function Stack({
  className,
  direction = 'vertical',
  align = 'stretch',
  justify = 'start',
  gap = 4,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  direction?: 'vertical' | 'horizontal'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between'
  gap?: 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16
}) {
  const directionClass = direction === 'vertical' ? 'flex flex-col' : 'flex flex-row'
  
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  }

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
  }

  const gapClasses = {
    0: 'gap-0',
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
    12: 'gap-12',
    16: 'gap-16',
  }

  return (
    <div
      className={cn(
        'flex',
        directionClass,
        alignClasses[align],
        justifyClasses[justify],
        gapClasses[gap],
        className
      )}
      {...props}
    />
  )
}

// Cluster Component - groups inline elements that wrap when needed
export function Cluster({
  className,
  align = 'center',
  justify = 'start',
  gap = 3,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  align?: 'start' | 'center' | 'end' | 'baseline'
  justify?: 'start' | 'center' | 'end' | 'between'
  gap?: 0 | 1 | 2 | 3 | 4 | 6 | 8
}) {
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    baseline: 'items-baseline',
  }

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
  }

  const gapClasses = {
    0: 'gap-0',
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  }

  return (
    <div
      className={cn(
        'flex flex-wrap',
        alignClasses[align],
        justifyClasses[justify],
        gapClasses[gap],
        className
      )}
      {...props}
    />
  )
}

// Spacer Component - handles adjustable spacing margins
export function Spacer({
  className,
  size = 4,
  axis = 'vertical',
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  size?: 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16 | 20 | 24 | 32
  axis?: 'vertical' | 'horizontal'
}) {
  const sizeClasses = {
    1: axis === 'vertical' ? 'h-1' : 'w-1',
    2: axis === 'vertical' ? 'h-2' : 'w-2',
    3: axis === 'vertical' ? 'h-3' : 'w-3',
    4: axis === 'vertical' ? 'h-4' : 'w-4',
    6: axis === 'vertical' ? 'h-6' : 'w-6',
    8: axis === 'vertical' ? 'h-8' : 'w-8',
    12: axis === 'vertical' ? 'h-12' : 'w-12',
    16: axis === 'vertical' ? 'h-16' : 'w-16',
    20: axis === 'vertical' ? 'h-20' : 'w-20',
    24: axis === 'vertical' ? 'h-24' : 'w-24',
    32: axis === 'vertical' ? 'h-32' : 'w-32',
  }

  return (
    <div
      className={cn('shrink-0', sizeClasses[size], className)}
      {...props}
    />
  )
}

// Section Component - handles semantic margins and paddings
export function Section({
  className,
  id,
  as: Component = 'section',
  ...props
}: React.ComponentPropsWithoutRef<'section'> & {
  as?: React.ElementType
}) {
  return (
    <Component
      id={id}
      className={cn('relative py-(--section-padding-y) overflow-hidden', className)}
      {...props}
    />
  )
}

// Section Header layouts
export function SectionHeader({
  className,
  align = 'left',
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  align?: 'left' | 'center' | 'right'
}) {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end',
  }

  return (
    <div
      className={cn(
        'max-w-3xl flex flex-col gap-3 mb-10 md:mb-16',
        alignClasses[align],
        className
      )}
      {...props}
    />
  )
}

// Section Title
export function SectionTitle({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'h2'>) {
  return (
    <h2
      className={cn(
        'font-heading tracking-tight text-white mb-2',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

// Section Description
export function SectionDescription({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p
      className={cn(
        'max-w-2xl text-muted-foreground text-base md:text-lg leading-relaxed',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}
