import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-gray-100 mb-6 text-center lg:text-left">
        Welcome to the RuneScape PvM Hub
      </h1>
      <p className="text-xl text-gray-400 mb-10 text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
        Your ultimate toolkit for mastering Player-versus-Monster content in RuneScape.
        Inspired by the community's best practices, designed for efficiency and customization.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card title="PvM Guide Editor">
          <p className="text-gray-300 mb-4">
            Create, manage, and share detailed guides for your favorite RuneScape bosses.
            Leverage AI to help draft comprehensive strategies.
          </p>
          <Link to="/guide-editor">
            <Button className="w-full">Start Editing Guides</Button>
          </Link>
        </Card>

        <Card title="Preset Maker">
          <p className="text-gray-300 mb-4">
            Design and save your optimal gear and inventory setups for various PvM encounters.
            Quickly switch between different styles without hassle.
          </p>
          <Link to="/preset-maker">
            <Button className="w-full">Build Presets</Button>
          </Link>
        </Card>

        <Card title="Gear Simulator">
          <p className="text-gray-300 mb-4">
            Experiment with different equipment combinations to see how they impact your stats.
            Optimize your offensive and defensive capabilities.
          </p>
          <Link to="/gear-simulator">
            <Button className="w-full">Simulate Gear</Button>
          </Link>
        </Card>
      </div>

      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-100 mb-6">Why Use the PvM Hub?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-indigo-400 mb-2">Streamlined Workflow</h3>
            <p className="text-gray-300">
              Centralize all your PvM planning in one intuitive application.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-indigo-400 mb-2">Customization</h3>
            <p className="text-gray-300">
              Tailor guides, presets, and simulations to your unique playstyle.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-indigo-400 mb-2">AI-Powered Assistance</h3>
            <p className="text-gray-300">
              Get intelligent drafts for your guides, saving you time and effort.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-100 mb-6">About RuneScape PvM</h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Player-versus-Monster (PvM) in RuneScape involves engaging in combat with various
          monsters and bosses to obtain valuable loot, gain experience, and achieve combat
          mastery. Effective PvM requires strategic gear setups, precise ability rotations,
          and in-depth knowledge of boss mechanics. The PvM Hub aims to equip players with
          the tools needed to excel in these challenging encounters.
        </p>
      </section>
    </div>
  );
};

export default HomePage;