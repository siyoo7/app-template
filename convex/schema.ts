import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    clerkUserId: v.string(),
  })
    .index('by_email', ['email'])
    .index('by_clerkUserId', ['clerkUserId']),

  // Stripe-ready table — populated only when Phase E is activated.
  subscriptions: defineTable({
    userId: v.id('users'),
    stripeCustomerId: v.string(),
    stripeSubscriptionId: v.string(),
    status: v.string(),
    priceId: v.string(),
    currentPeriodEnd: v.number(),
  }).index('by_userId', ['userId']),
});
