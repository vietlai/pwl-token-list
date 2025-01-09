#!/usr/bin/env bash
cue vet src/tokens/pulsewallet.tokenlist.json automerge/schema.cue -d '#Tokenlist'
