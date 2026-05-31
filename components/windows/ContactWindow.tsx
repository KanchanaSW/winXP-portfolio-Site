"use client";

import { useState } from "react";
import { XPButton } from "@/components/xp/XPButton";
import { XPInput, XPTextarea } from "@/components/xp/XPInput";
import { useDesktopStore } from "@/stores/desktopStore";
import { portfolio } from "@/portfolio.config";

export function ContactWindow() {
  const { showMessageBox } = useDesktopStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const subject = encodeURIComponent(`Portfolio contact from ${name || "Guest"}`);
    const body = encodeURIComponent(
      `From: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:${portfolio.email}?subject=${subject}&body=${body}`;
    showMessageBox("Message", "Your default mail client should open. Message ready to send! ✓");
  };

  const handleCancel = () => {
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="p-4 text-[11px] flex flex-col gap-3">
      <div>
        <label className="block mb-1">Name:</label>
        <XPInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="block mb-1">Email:</label>
        <XPInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={portfolio.email}
        />
      </div>
      <div>
        <label className="block mb-1">Message:</label>
        <XPTextarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
      </div>
      <div className="flex justify-end gap-2 mt-2">
        <XPButton variant="primary" onClick={handleSend}>
          Send Message
        </XPButton>
        <XPButton onClick={handleCancel}>Cancel</XPButton>
      </div>
    </div>
  );
}
