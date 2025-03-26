import { default as ConnectorProps } from "./connector-slot-schema.svx";
import { default as MatchProps } from "./match-slot-schema.svx";
import { default as HeaderProps } from "./header-slot-schema.svx";

const headerSlotSchema = {
	title: "header",
	description: "Slot for round header component",
	props: HeaderProps,
};

const matchSlotSchema = {
	title: "match",
	description: "Slot for match component",
	props: MatchProps,
};

const connectorSlotSchema = {
	title: "connector",
	description: "Slot for connector component",
	props: ConnectorProps,
};

export default function getSlotsSchema(
	schema: "header" | "match" | "connector",
) {
	switch (schema) {
		case "header":
			return headerSlotSchema;
		case "match":
			return matchSlotSchema;
		case "connector":
			return connectorSlotSchema;
	}
}
