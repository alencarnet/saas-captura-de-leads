-- Fluxo LeadAI Database Schema
-- PostgreSQL schema for lead management and AI qualification system

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (Admin and Clients)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'client')),
  company_name VARCHAR(255),
  phone VARCHAR(50),
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Plans table
CREATE TABLE IF NOT EXISTS plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  lead_limit INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  billing_cycle VARCHAR(50) DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'quarterly', 'annual')),
  features JSONB,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Client subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES plans(id),
  leads_received INTEGER DEFAULT 0,
  leads_remaining INTEGER,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  niche VARCHAR(255),
  target_audience TEXT,
  source VARCHAR(100) CHECK (source IN ('google_ads', 'meta_ads', 'apollo', 'hunter', 'manual', 'csv')),
  keywords TEXT[],
  active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  company VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(50),
  message TEXT,
  source VARCHAR(100),
  
  -- AI Qualification fields
  score INTEGER CHECK (score >= 0 AND score <= 100),
  category VARCHAR(50) CHECK (category IN ('Alta', 'Média', 'Baixa')),
  qualification_reason TEXT,
  qualified BOOLEAN DEFAULT false,
  
  -- Distribution fields
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'qualified', 'distributed', 'contacted', 'converted', 'discarded')),
  
  -- Metadata
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  qualified_at TIMESTAMP,
  distributed_at TIMESTAMP
);

-- Lead interactions/history
CREATE TABLE IF NOT EXISTS lead_interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  interaction_type VARCHAR(100) CHECK (interaction_type IN ('whatsapp_sent', 'email_sent', 'call', 'meeting', 'note', 'status_change')),
  content TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- WhatsApp messages log
CREATE TABLE IF NOT EXISTS whatsapp_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  phone VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'read', 'failed')),
  sent_at TIMESTAMP,
  delivered_at TIMESTAMP,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contracts (Clicksign integration)
CREATE TABLE IF NOT EXISTS contracts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  clicksign_document_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'signed', 'cancelled')),
  sent_at TIMESTAMP,
  signed_at TIMESTAMP,
  contract_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_leads_campaign ON leads(campaign_id);
CREATE INDEX idx_leads_assigned ON leads(assigned_to);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_score ON leads(score);
CREATE INDEX idx_leads_created ON leads(created_at);
CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_interactions_lead ON lead_interactions(lead_id);
CREATE INDEX idx_whatsapp_lead ON whatsapp_messages(lead_id);

-- Insert default plans
INSERT INTO plans (name, lead_limit, price, billing_cycle, features) VALUES
('Starter', 20, 197.00, 'monthly', '{"ai_qualification": true, "whatsapp": true, "dashboard": "basic"}'),
('Professional', 100, 497.00, 'monthly', '{"ai_qualification": true, "whatsapp": true, "dashboard": "advanced", "api_integrations": true, "multiple_campaigns": true}'),
('Enterprise', -1, 997.00, 'monthly', '{"ai_qualification": true, "whatsapp": true, "dashboard": "advanced", "api_integrations": true, "multiple_campaigns": true, "api_access": true, "webhooks": true, "priority_support": true}');
